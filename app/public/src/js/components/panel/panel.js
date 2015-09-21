'use strict';

var React = require('react');
var Navigation = require('./navigation/navigation');

var Panel = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default panel-component">
                <div className="panel-body">
                    <div className="navigation col-sm-3 col-md-3 col-lg-3">
                        <Navigation />
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Panel;