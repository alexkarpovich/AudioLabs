'use strict';

var React = require('react');

var StageHeader = React.createClass({
    render: function() {
        return (
            <div className="stage-header">
                <h2>Stage</h2>
                <div className="short-description">Short description</div>
            </div>
        );
    }
});

module.exports = StageHeader;