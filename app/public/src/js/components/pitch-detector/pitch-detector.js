'use strict';

var React = require('react');
var WaveForm = require('./waveform/waveform');

var PitchDetector = React.createClass({
    render: function() {
        return (
            <div className="pitch-detector">
                <WaveForm />
                <div className="controls">
                    <button className="btn btn-danger btn-md">Record</button>
                </div>
            </div>
        );
    }
});

module.exports = PitchDetector;
