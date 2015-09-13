var React = require('react');
var StageHeader = require('./stage/content/stage-header');
var StageNavigator = require('./stage/navigator/navigator');

var Container = React.createClass({
    render: function() {
        return (
            <div className="container-component row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">Heading</div>
                        <div className="panel-body">
                            <StageNavigator />
                        </div>
                        <div className="panel-footer"></div>
                    </div>
                </div>
                <div className="col-sm-8 col-md-9 col-lg-9">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <StageHeader />
                        </div>
                        <div className="panel-body">
                            good
                        </div>
                        <div className="panel-footer"></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Container;