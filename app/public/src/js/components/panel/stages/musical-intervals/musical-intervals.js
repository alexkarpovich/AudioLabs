'use strict';

var React = require('react');
var Markdown = require('../../../markdown/markdown');
var Layout = require('./../common/layout');
var musicalIntervals = require('./musical-intervals-md');

var MusicalIntervals = React.createClass({
    render: function() {
        return (
            <Layout>
                <Markdown input={musicalIntervals} />
            </Layout>
        );
    }
});

module.exports = MusicalIntervals;