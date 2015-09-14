'use strict';

var React = require('react');

var StageHeader = React.createClass({
    render: function() {
        return (
            <div className="stage-header">
                <h2>{this.props.header}</h2>
                <div className="short-description">{this.props.short}</div>
            </div>
        );
    }
});

module.exports = StageHeader;