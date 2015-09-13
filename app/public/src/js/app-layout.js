var React = require('react');
var Menu = require('./components/menu/menu');

var Layout = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Menu />
                <div className="content">
                    <div className="panel panel-default">
                        <div className="panel-heading">Heading</div>
                        <div className="panel-body">
                            {this.props.children}
                        </div>
                        <div className="panel-footer"></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Layout;