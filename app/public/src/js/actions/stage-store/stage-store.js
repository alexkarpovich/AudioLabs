'use strict';

var AppDispatcher = require('../../dispatcher/app-dispatcher');
var StageStoreConstants = require('../../constants/stage-store/stage-store');

var StageStoreAction = {
	setActivePitchStage: function (pitchStageId) {
		AppDispatcher.handleViewAction({
			type: StageStoreConstants.CHANGE_PITCH_STAGE,
			id: pitchStageId
		});
	},

	successPitch: function () {
		AppDispatcher.handleViewAction({
			type: StageStoreConstants.PITCH_SUCCESS
		});
	}
};

module.exports = StageStoreAction;
