var React = require('react');
var StageHeader = require('./stage/content/header');
var StageContent = require('./stage/content/content');
var StageNavigator = require('./stage/navigator/navigator');

var Container = React.createClass({
    render: function() {
        return (
            <div className="container-component row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">Navigation</div>
                        <div className="panel-body padding-0">
                            <StageNavigator />
                        </div>
                        <div className="panel-footer"></div>
                    </div>
                </div>
                <div className="col-sm-8 col-md-9 col-lg-9">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Container;