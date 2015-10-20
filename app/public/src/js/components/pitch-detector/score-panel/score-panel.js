'use strict';

var React = require('react');
var vextab = require('vextab');
var StageStore = require('../../../stores/stage-store');
var StageStoreAction = require('../../../actions/stage-store/stage-store');
var StageStoreConstants = require('../../../constants/stage-store/stage-store');

var VexTab = vextab.VexTab;
var Artist = vextab.Artist;
var Renderer = vextab.Vex.Flow.Renderer;

var state = {
    baseNote: 'C',
    expectedNote: 'C',
    actualNote: 'C'
};

var ScorePanel = React.createClass({
    getInitialState: function() {
        return state;
    },
    componentDidMount: function() {
        StageStore.subscribe(StageStoreConstants.PITCH_STAGE_CHANGED, this._onPitchStageChanged);
        window.addEventListener('resize', this.repaintVextab);
        this.repaintVextab();
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.repaintVextab);
        StageStore.unsubscribe(StageStoreConstants.PITCH_STAGE_CHANGED, this._onPitchStageChanged);
    },

    componentWillReceiveProps: function(props) {
        if (props.pitch && props.pitch.type === 'confident') {
            this.state.actualNote = props.pitch.note;

            if (this.state.actualNote == this.state.expectedNote) {
                StageStoreAction.successPitch();
            }

            this.repaintVextab();
        }
    },

    _onPitchStageChanged: function () {
        var pitchStage = StageStore.getActivePitchStage();

        this.state.expectedNote = pitchStage.note;
        this.repaintVextab();
    },

    repaintVextab: function(e) {
        let canvas = React.findDOMNode(this.refs.scorePanel);
        let container = React.findDOMNode(this.refs.container);
        let renderer = new Renderer(canvas, Renderer.Backends.CANVAS);

        let artist = new Artist(10, 10, container.clientWidth, {scale: 1});
        let vextab = new VexTab(artist);

        let vexline = `tabstave notation=true tablature=false\n \
            notes ${this.state.baseNote}/4 ${this.state.expectedNote}/4 $Ожидается$ | ${this.state.actualNote}/4 $Результат$\n`;

        try {
            vextab.parse(vexline);
            artist.render(renderer);
        } catch (e) {
            console.log(e);
        }
    },

    render: function() {
        return (
            <div className="score-panel" ref="container">
                <canvas ref="scorePanel"></canvas>
            </div>
        );
    }
});

module.exports = ScorePanel;
