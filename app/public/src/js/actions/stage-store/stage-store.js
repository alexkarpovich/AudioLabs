'use strict';

var AppDispatcher = require('../../dispatcher/app-dispatcher');
var StageStoreConstants = require('../../constants/stage-store/stage-store');

var StageStoreAction = {
	setActivePitchStage: function (pitchStageId) {
		AppDispatcher.handleViewAction({
			type: StageStoreConstants.PITCH_STAGE_CHANGED,
			id: pitchStageId
		});
	}
};

module.exports = StageStoreAction;
