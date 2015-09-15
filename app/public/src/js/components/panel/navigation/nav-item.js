'use strict';

var React = require('react');

var NavItem = React.createClass({
    render: function() {
        return (
            <ul key={this.props.key} className="nav-item" hint={this.props.stage.short}>
                {this.props.stage.title}
            </ul>
        );
    }
});

module.exports = NavItem;