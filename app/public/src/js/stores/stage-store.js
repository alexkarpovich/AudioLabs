'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _stages = {
    'introduction': {
        title: 'Introduction',
        short: 'This is about some musical things'
    },
    'musical-intervals': {
        title: 'Musical Intervals',
        short: 'This is about what is musical intervals'
    },
    'pitch-detection': {
        title: 'Pitch Detection',
        short: 'Final test of your hearing'
    }
};

var EVENT_CHANGE = 'change';

function getStageById(id) {
    return _stages[id];
}

function getStages() {
    return _stages;
}

var StageStore = assign(EventEmitter.prototype, {
    emitChange: function() {
        this.emit(EVENT_CHANGE);
    },

    addChangeListener: function(callback) {
        this.on(EVENT_CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(EVENT_CHANGE, callback);
    },

    getStages: function() {
        return getStages();
    },

    getStageById: function(id) {
        return getStageById(id);
    }
});

module.exports = StageStore;
