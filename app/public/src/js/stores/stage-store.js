'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var StageStoreConstants = require('../constants/stage-store/stage-store');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _stages = {
    'introduction': {
        key: 'introduction',
        title: 'Введение',
        short: 'Для чего предназначен ресурс, чем он может помочь и как им пользоваться',
        active: true
    },
    'musical-intervals': {
        key: 'musical-intervals',
        title: 'Музыкальные интервалы',
        short: 'Краткая теория музыкальных интервалов, их роль и применение в музыке',
        active: false
    },
    'pitch-detection': {
        key: 'pitch-detection',
        title: 'Определение тона голоса',
        short: 'Тест разбит на несколько этапов, на каждом из которых проверяется конкретный интервал',
        active: false
    }
};

function getStageById(id) {
    return _stages[id];
}

function getStages() {
    return _stages;
}

var StageStore = assign(EventEmitter.prototype, {
    emitEvent: function(eventConstant) {
        this.emit(eventConstant);
    },

    subscribe: function(eventConstant, callback) {
        this.on(eventConstant, callback);
    },

    unsubscribe: function(eventConstant, callback) {
        this.removeListener(eventConstant, callback);
    },

    getStages: function() {
        return getStages();
    },

    getStageById: function(id) {
        return getStageById(id);
    },

    setActiveStage: function(id) {
        if (_stages[id]) {
            Object.keys(_stages).forEach(function (key) {
                _stages[key].active = key === id;
            });

            this.emitEvent(StageStoreConstants.STAGE_CHANGED);
        }
    },

    getActiveStage: function() {
        var activeStage = null;

        Object.keys(_stages).forEach(function(key) {
            if (_stages[key].active) {
                activeStage = _stages[key];
            }
        });

        return activeStage;
    }
});

module.exports = StageStore;
