'use strict';

var React = require('react');
var showdown = require('showdown');

var converter = new showdown.Converter();

var Markdown = React.createClass({
    getHtml: function(html) {
        return {__html: html};
    },
    render: function() {
        var html = converter.makeHtml(this.props.input);

        return (
            <div className="markdown" dangerouslySetInnerHTML={this.getHtml(html)}></div>
        );
    }
});

module.exports = Markdown;
