'use strict';

import React from 'react';
import vextab from 'vextab';
import AudioStore from '../../../stores/audio-store.js';
import AudioStoreConstants from '../../../constants/audio-store/audio-store.js';

let VexTab = vextab.VexTab;
let Artist = vextab.Artist;
let Renderer = vextab.Vex.Flow.Renderer;

let scoreString = "tabstave notation=true tablature=false\n \
    notes C/4 E/4 $Expect$ | F/4 $Actual$\n";

let ScorePanel = React.createClass({
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        AudioStore.subscribe(AudioStoreConstants.GOT_ANALYSER, this.gotAnalyser);
        this.handleResize();
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    handleResize: function(e) {
        let canvas = React.findDOMNode(this.refs.scorePanel);
        let container = React.findDOMNode(this.refs.container);
        let renderer = new Renderer(canvas, Renderer.Backends.CANVAS);

        let artist = new Artist(10, 10, container.clientWidth, {scale: 1});
        let vextab = new VexTab(artist);

        try {
            vextab.parse(scoreString);
            artist.render(renderer);
        } catch (e) {
            console.log(e);
        }
    },

    gotAnalyser: function() {
        console.log('Got analyser does', JSON.stringify(AudioStore.getPitch()));
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
