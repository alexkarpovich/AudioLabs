'use strict';

var React = require('react');

var Content = React.createClass({
    render: function() {
        return (
            <div className="stage-content">
                {this.props.source}
            </div>
        );
    }
});

module.exports = Content;
