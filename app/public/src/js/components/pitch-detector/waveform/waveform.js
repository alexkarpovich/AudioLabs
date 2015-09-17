'use strict';

var React = require('react');
var AudioStore = require('../../../stores/audio-store');
var AudioStoreConstants = require('../../../constants/audio-store/audio-store');

var _analyser,
    canvas,
    canvasContext,
    audioData,
    width,
    height;

function updateFrame() {
    requestAnimationFrame(updateFrame);
    width = canvas.width;
    height = canvas.height;

    canvasContext.clearRect(0, 0, width, height);
    canvasContext.fillStyle = 'rgb(255, 255, 255)';
    canvasContext.fillRect(0, 0, width, height);
    canvasContext.linewidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 121,181)';

    canvasContext.beginPath();

    _analyser.getByteTimeDomainData(audioData);

    var slicewidth = width * 1.0 / _analyser.frequencyBinCount;
    var x = 0;
    for(var i = 0; i < _analyser.frequencyBinCount; i++) {
        var v = audioData[i] / 128.0;
        var y = -v * height/2 + height;

        if(i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }

        x += slicewidth;
    }

    canvasContext.lineTo(canvas.width, canvas.height/2);
    canvasContext.stroke();
}

var Waveform = React.createClass({
    componentWillMount: function () {
        AudioStore.subscribe(AudioStoreConstants.GOT_AUDIO_CONTEXT, this._gotAudioContext);
        AudioStore.subscribe(AudioStoreConstants.GOT_USER_MEDIA, this._gotUserMedia);
        AudioStore.subscribe(AudioStoreConstants.GOT_ANALYSER, this._gotAnalyser);
    },

    componentDidMount: function () {
        canvas = React.findDOMNode(this.refs.canvas);
        canvasContext = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
    },

    _gotAudioContext: function() {
        console.log('Got Audio context');
    },

    _gotUserMedia: function() {
        console.log('Got User Media');
    },

    _gotAnalyser: function() {
        _analyser = AudioStore.getAnalyser();
        audioData = new Uint8Array(_analyser.frequencyBinCount);

        updateFrame();
    },

    render: function() {
        return (
            <div className="waveform">
                <h4>Waveform</h4>
                <canvas className="canvas" ref="canvas"></canvas>
            </div>
        );
    }
});

module.exports = Waveform;
