var React = require('react');
var Menu = require('./components/menu/menu');

var Layout = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Menu />
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Layout;