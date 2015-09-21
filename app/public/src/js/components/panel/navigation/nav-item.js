'use strict';

var React = require('react');
var Link = require('react-router').Link;
var StageStore = require('../../../stores/stage-store');

var NavItem = React.createClass({
    changeActiveStage: function() {
        StageStore.setActiveStage(this.props.stage.key);
    },

    render: function() {
        return (
            <ul key={this.props.key} className="nav-item" hint={this.props.stage.short}
                onClick={this.changeActiveStage}>
                <Link to={`/stages/${this.props.stage.key}`} >
                    {this.props.stage.title}
                </Link>
            </ul>
        );
    }
});

module.exports = NavItem;