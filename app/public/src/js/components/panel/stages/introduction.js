'use strict';

var React = require('react');
var Markdown = require('../../markdown/markdown');
var Layout = require('./common/layout');

var content = `
#Super class
List:
  - Item 1
  - Item 2
`;

let Introduction = React.createClass({
    render: function() {
        return (
            <Layout>
                <Markdown input={content} />
            </Layout>
        );
    }
});

module.exports = Introduction;