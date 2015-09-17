'use strict';

var PitchDetect = require('pitch-detect');
var AudioStoreConstants = require('../constants/audio-store/audio-store');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var $ = require('jquery');

var BUFFER_SIZE = 2048;

var _mediaStream = null;
var _audioContext = null;
var _source = null;
var _analyser = null;

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

    initAudio: function() {
        getMediaStream().then(function(stream) {
            _audioContext = new AudioContext();
            this.emitEvent(AudioStoreConstants.GOT_AUDIO_CONTEXT);
            this.emitEvent(AudioStoreConstants.GOT_USER_MEDIA);
            _analyser = _audioContext.createAnalyser();
            _analyser.fftSize = BUFFER_SIZE;
            this.emitEvent(AudioStoreConstants.GOT_ANALYSER);
            _source = _audioContext.createMediaStreamSource(stream);
            _source.connect(_audioContext.destination);
            _source.connect(_analyser);
        }.bind(this));
    },

    getAnalyser: function() {
        return _analyser;
    },

    getPitch: function() {
        var pitchDetect = new PitchDetect(_mediaStream);
        return pitchDetect.getPitch();
    }
});

module.exports = AudioStore;
