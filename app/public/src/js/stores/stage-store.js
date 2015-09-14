'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _stages = [
    {
        "header": "Stage 1",
        "short": "Short description of stage 1",
        "description": "Description 1"
    },
    {
        "header": "Stage 2",
        "short": "Short description of stage 2",
        "description": "Description 2"
    }
];

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
