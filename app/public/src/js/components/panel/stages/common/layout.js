'use strict';

var React = require('react');
var Header = require('../header/header');

var Layout = React.createClass({
    render: function() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <Header />
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
                <div className="panel-footer">
                    Footer
                </div>
            </div>
        );
    }
});

module.exports = Layout;