'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var StageStoreConstants = require('../constants/stage-store/stage-store');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var alertify = require('alertify');

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

var _pitchStages = [
    {
        id: 0,
        title: 'Прима',
        note: 'C',
        isDone: 0,
        isActive: 1
    },
    {
        id: 1,
        title: 'Малая секунда',
        note: 'C#',
        isDone: 0,
        isActive: 0
    },
    {
        id: 2,
        title: 'Большая секунда',
        note: 'D',
        isDone: 0,
        isActive: 0
    },
    {
        id: 3,
        title: 'Малая терция',
        note: 'D#',
        isDone: 0,
        isActive: 0
    },
    {
        id: 4,
        title: 'Большая терция',
        note: 'E',
        isDone: 0,
        isActive: 0
    },
    {
        id: 5,
        title: 'Чистая кварта',
        note: 'F',
        isDone: 0,
        isActive: 0
    },
    {
        id: 6,
        title: 'Чистая квинта',
        note: 'G',
        isDone: 0,
        isActive: 0
    }

];

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
    },

    getPitchStages: function() {
        return _pitchStages;
    },

    getPitchStageById: function (pitchStageId) {
        var pitchStage = null;

        _pitchStages.forEach(function(stage) {
            if (pitchStageId === stage.id) {
                pitchStage = stage;
            }
        });

        return pitchStage;
    },

    setActivePitchStage: function (id) {
        _pitchStages = _pitchStages.map(function (stage) {
            stage.isActive = stage.id == id;

            return stage;
        });

        this.emitEvent(StageStoreConstants.PITCH_STAGE_CHANGED);
    },

    getActivePitchStage: function () {
        var activePitchStage = null;

        _pitchStages.forEach(function (stage) {
            if (stage.isActive) {
                activePitchStage = stage;
            }
        });

        return activePitchStage;
    },

    checkCompleteness: function () {
        var count = 0;

        _pitchStages.forEach(function (stage) {
            if (stage.isDone) {
                count++;
            }
        });

        if (count == _pitchStages.length) {
            alertify.alert('Поздравляем с успешной победой!!!');
        }
    },

    setSuccessPitch: function () {
        _pitchStages = _pitchStages.map(function (stage) {
            if (stage.isActive) {
                stage.isDone = true;
            }

            return stage;
        });

        this.checkCompleteness();

        this.emitEvent(StageStoreConstants.PITCH_SUCCESS_DONE);
    }
});

StageStore.dispatchToken = AppDispatcher.register(function(payload) {
    switch (payload.action.type) {
        case StageStoreConstants.CHANGE_PITCH_STAGE:
            StageStore.setActivePitchStage(payload.action.id);
            break;

        case StageStoreConstants.PITCH_SUCCESS:
            StageStore.setSuccessPitch();
            break;
    }
});

module.exports = StageStore;
