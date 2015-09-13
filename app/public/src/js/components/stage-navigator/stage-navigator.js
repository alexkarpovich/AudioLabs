'use strict';

var React = require('react');
var StageItem = require('./stage-item');

var StageNavigator = React.createClass({
    render: function() {
        return (
            <div className="stage-navigator">
                <StageItem />
            </div>
        );
    }
});

module.exports = StageNavigator;