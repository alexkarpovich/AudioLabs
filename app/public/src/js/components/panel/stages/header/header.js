'use strict';

var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <div className="stage-header">
                <h2 className="margin-0">Stage Header</h2>
                <span>Short description</span>
            </div>
        );
    }
});

module.exports = Header;
