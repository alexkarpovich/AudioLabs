'use strict';

var React = require('react');
var Layout = require('./common/layout');
var PitchDetector = require('../../pitch-detector/pitch-detector');

var PitchDetection = React.createClass({
    render: function() {
        return (
            <Layout>
                <PitchDetector />
            </Layout>
        );
    }
});

module.exports = PitchDetection;
