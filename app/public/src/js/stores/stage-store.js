'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var StageStoreConstants = require('../constants/stage-store/stage-store');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _stages = {
    'introduction': {
        title: 'Введение',
        short: 'Для чего предназначен ресурс, чем он может помочь и как им пользоваться'
    },
    'musical-intervals': {
        title: 'Музыкальные интервалы',
        short: 'Краткая теория музыкальных интервалов, их роль и применение в музыке'
    },
    'pitch-detection': {
        title: 'Определение тона голоса',
        short: 'Тест разбит на несколько этапов, на каждом из которых проверяется конкретный интервал'
    }
};

function getStageById(id) {
    return _stages[id];
}

function getStages() {
    return _stages;
}

var StageStore = assign(EventEmitter.prototype, {
    emitChange: function() {
        this.emit(StageStoreConstants.CHANGED);
    },

    addChangeListener: function(callback) {
        this.on(StageStoreConstants.CHANGED, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(StageStoreConstants.CHANGED, callback);
    },

    getStages: function() {
        return getStages();
    },

    getStageById: function(id) {
        return getStageById(id);
    }
});

module.exports = StageStore;
