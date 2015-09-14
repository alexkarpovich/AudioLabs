'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;

var NavItem = React.createClass({
    render: function() {
        return (
            <ul key={this.props.stageId} className="nav-item">
                <Link to={'/stage/' + this.props.stageId}>
                    <span>{this.props.header}</span>
                </Link>
            </ul>
        );
    }
});

module.exports = NavItem;