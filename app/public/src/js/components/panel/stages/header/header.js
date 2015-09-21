'use strict';

var React = require('react');
var StageStore = require('../../../../stores/stage-store');
var StageStoreConstants = require('../../../../constants/stage-store/stage-store');

var Header = React.createClass({
    getInitialState: function() {
        return {stage: StageStore.getActiveStage()};
    },
    componentWillMount: function() {
        StageStore.subscribe(StageStoreConstants.STAGE_CHANGED, this.stageChanged);
    },

    componentWillUnmount: function() {
        StageStore.unsubscribe(StageStoreConstants.STAGE_CHANGED, this.stageChanged);
    },

    stageChanged: function() {
        this.state.stage = StageStore.getActiveStage();
    },

    render: function() {
        return (
            <div className="stage-header">
                <h2 className="margin-0">{this.state.stage.title}</h2>
                <span>{this.state.stage.short}</span>
            </div>
        );
    }
});

module.exports = Header;
