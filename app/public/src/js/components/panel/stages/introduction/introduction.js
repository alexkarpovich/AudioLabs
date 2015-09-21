'use strict';

var React = require('react');
var Markdown = require('../../../markdown/markdown');
var Layout = require('./../common/layout');

var introduction = require('./introduction-md.js');

let Introduction = React.createClass({
    render: function() {
        return (
            <Layout>
                <Markdown input={introduction} />
            </Layout>
        );
    }
});

module.exports = Introduction;