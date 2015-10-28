'use strict';

var PitchDetect = require('pitch-detect');
var AudioStoreConstants = require('../constants/audio-store/audio-store');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var $ = require('jquery');

let BUFFER_SIZE = 2048;

let _mediaStream = null;
let _audioContext = null;
let _source = null;
let _analyser = null;
let _oscillator = null;
let _gain = null;
let _pitchDetector = null;
let isPrimaPlaying = false;

function getMediaStream() {
    var deferred = $.Deferred();

    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
    }

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true}, function(stream) {
            deferred.resolve(stream);
        }, function () {
            promise.reject();
            console.log('Error connecting userMedia');
        })
    } else {
        promise.reject();
        alert('Browser not support UserMedia');
    }


    return deferred.promise();
}

var AudioStore = assign(EventEmitter.prototype, {
    emitEvent: function(eventConst) {
        this.emit(eventConst);
    },

    subscribe: function(eventConst, callback) {
        this.on(eventConst, callback);
    },

    unsubscribe: function (eventConst, callback) {
        this.removeListener(eventConst, callback);
    },

    _gotMediaStream: function(stream) {
        _mediaStream = stream;
        this.emitEvent(AudioStoreConstants.GOT_USER_MEDIA);

        _pitchDetector = new PitchDetect(stream);
    },

    _gotAudioContext: function() {
        _audioContext = new AudioContext();
        this.emitEvent(AudioStoreConstants.GOT_AUDIO_CONTEXT);
    },

    _gotAnalyser: function() {
        _analyser = _audioContext.createAnalyser();
        _analyser.fftSize = BUFFER_SIZE;
        _oscillator = _audioContext.createOscillator();
        _gain = _audioContext.createGain();
        _gain.value = 50;
        _oscillator.type = 'sine';
        _oscillator.frequency.value = 261.6;
        this.emitEvent(AudioStoreConstants.GOT_ANALYSER);
    },

    initAudio: function() {
        getMediaStream().then(function(stream) {
            this._gotAudioContext();
            this._gotMediaStream(stream);
            this._gotAnalyser();
            _source = _audioContext.createMediaStreamSource(stream);
            _source.connect(_audioContext.destination);
            _source.connect(_analyser);
            _oscillator.connect(_gain);
            _oscillator.start();
        }.bind(this));
    },

    getAnalyser: function() {
        return _analyser;
    },

    getPitch: function() {
        return _pitchDetector.getPitch();
    },

    playPrima: function () {
        if (isPrimaPlaying) {
            _gain.disconnect(_audioContext.destination);
            isPrimaPlaying = false;
        } else {
            _gain.connect(_audioContext.destination);
            isPrimaPlaying = true;
        }
    }
});

module.exports = AudioStore;
