'use strict';

var React = require('react');
var NavItem = require('./nav-item');
var StageStore = require('../../../stores/stage-store');

function getStages() {
    return {stages: StageStore.getStages()};
}

var Navigator = React.createClass({
    getInitialState: function() {
        return getStages();
    },
    render: function() {

        var stages = this.state.stages.map(function(stage, index) {
            return (
                <NavItem key={index} stageId={index} header={stage.header} />
            );
        });

        return (
            <div className="navigator">
                {stages}
            </div>
        );
    }
});

module.exports = Navigator;