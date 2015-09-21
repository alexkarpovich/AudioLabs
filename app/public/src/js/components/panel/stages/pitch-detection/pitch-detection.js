'use strict';

var React = require('react');
var Layout = require('./../common/layout');
var Markdown = require('../../../markdown/markdown');
var pitchDetection = require('./pitch-detection-md');
var PitchDetector = require('../../../pitch-detector/pitch-detector');

var PitchDetection = React.createClass({
    render: function() {
        return (
            <Layout>
                <Markdown input={pitchDetection} />
                <PitchDetector />
            </Layout>
        );
    }
});

module.exports = PitchDetection;
