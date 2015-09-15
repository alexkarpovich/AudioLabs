'use strict';

var React = require('react');
var Layout = require('./common/layout');

var Introduction = React.createClass({
    render: function() {
        return (
            <Layout>
                Introduction page
            </Layout>
        );
    }
});

module.exports = Introduction;