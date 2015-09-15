'use strict';

var React = require('react');
var NavItem = require('./nav-item');
var StageStore = require('../../../stores/stage-store');

function getStages() {
    return {stages: StageStore.getStages()};
}

var Navigation = React.createClass({
    getInitialState: function() {
        return getStages();
    },
    render: function() {
        var items = Object.keys(this.state.stages).map(function(key, index) {
            return (
                <NavItem key={index} stage={this.state.stages[key]} />
            );
        }.bind(this));

        return (
            <div className="stage-navigation">
                {items}
            </div>
        );
    }
});

module.exports = Navigation;