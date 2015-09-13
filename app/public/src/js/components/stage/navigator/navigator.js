'use strict';

var React = require('react');
var StageItem = require('./nav-item');

var Navigator = React.createClass({
    render: function() {
        return (
            <div className="navigator">
                <StageItem />
            </div>
        );
    }
});

module.exports = Navigator;