'use strict';

var React = require('react');
var AudioStore = require('../../stores/audio-store');
var AudioStoreConstants = require('../../constants/audio-store/audio-store');
var WaveForm = require('./waveform/waveform');

AudioStore.initAudio();

var PitchDetector = React.createClass({
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
    render: function() {
        return (
            <div className="pitch-detector">
                <WaveForm />
                <div className="controls">
                    <button className="btn btn-danger btn-block btn-md">Record</button>
                </div>
            </div>
        );
    }
});

module.exports = PitchDetector;
