'use strict';

var React = require('react');
var AudioStore = require('../../stores/audio-store');
var AudioStoreConstants = require('../../constants/audio-store/audio-store');
var WaveForm = require('./waveform/waveform');
var ScorePanel = require('./score-panel/score-panel');
var MIDI = require('midi');

AudioStore.initAudio();

var PitchDetector = React.createClass({
    getInitialState: function() {
        return {pitch: null};
    },
    componentWillMount: function() {
        AudioStore.subscribe(AudioStoreConstants.GOT_AUDIO_CONTEXT, this._gotAudioContext);
        AudioStore.subscribe(AudioStoreConstants.GOT_USER_MEDIA, this._gotUserMedia);
        AudioStore.subscribe(AudioStoreConstants.GOT_ANALYSER, this._gotAnalyser);
    },
    _gotAudioContext: function() {

    },
    _gotUserMedia: function () {

    },
    _gotAnalyser: function () {

    },
    checkPitch: function() {
        this.setState({pitch: AudioStore.getPitch()});
    },
    render: function() {
        return (
            <div className="pitch-detector">
                <WaveForm />
                <ScorePanel pitch={this.state.pitch}/>
                <div className="controls">
                    <button className="btn btn-danger btn-block btn-md" onClick={this.checkPitch}>Check Pitch</button>
                </div>
            </div>
        );
    }
});

module.exports = PitchDetector;
