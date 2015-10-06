'use strict';

var React = require('react');
var Markdown = require('../markdown/markdown');
var home = require('./home-md');

var Home = React.createClass({
    render: function() {
        return (
            <div className="home">
            	<Markdown input={home} />
            </div>
        );
    }
});

module.exports = Home;