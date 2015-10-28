'use strict';

var React = require('react');
var AudioStore = require('../../stores/audio-store');
var AudioStoreConstants = require('../../constants/audio-store/audio-store');
var WaveForm = require('./waveform/waveform');
var ScorePanel = require('./score-panel/score-panel');
var PitchStages = require('./pitch-stages/pitch-stages');

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

    playPrimaSound: function() {
        AudioStore.playPrima();
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
                    <button className="prima btn btn-default btn-md" onClick={this.playPrimaSound}>Прима</button>
                    <button className="detect btn btn-danger btn-md" onClick={this.checkPitch}>Определить тон</button>
                </div>
                <PitchStages />
            </div>
        );
    }
});

module.exports = PitchDetector;
