'use strict';

import React from 'react';
import vextab from 'vextab';

var VexTab = vextab.VexTab;
var Artist = vextab.Artist;
var Renderer = vextab.Vex.Flow.Renderer;

var state = {
    baseNote: 'C',
    expectedNote: 'E',
    actualNote: 'E'
};

var ScorePanel = React.createClass({
    getInitialState: function() {
        return state;
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.repaintVextab);
        this.repaintVextab();
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.repaintVextab);
    },

    componentWillReceiveProps: function(props) {
        if (props.pitch && props.pitch.type === 'confident') {
            this.state.actualNote = props.pitch.note;

            this.repaintVextab();
        }
    },

    repaintVextab: function(e) {
        let canvas = React.findDOMNode(this.refs.scorePanel);
        let container = React.findDOMNode(this.refs.container);
        let renderer = new Renderer(canvas, Renderer.Backends.CANVAS);

        let artist = new Artist(10, 10, container.clientWidth, {scale: 1});
        let vextab = new VexTab(artist);

        let vexline = `tabstave notation=true tablature=false\n \
            notes ${this.state.baseNote}/4 ${this.state.expectedNote}/4 $Expect$ | ${this.state.actualNote}/4 $Actual$\n`;

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
