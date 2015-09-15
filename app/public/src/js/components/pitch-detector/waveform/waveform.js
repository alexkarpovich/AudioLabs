'use strict';

var React = require('react');

var Waveform = React.createClass({
    render: function() {
        return (
            <div className="waveform">
                <h4>Waveform</h4>
                <canvas className="canvas"></canvas>
            </div>
        );
    }
});

module.exports = Waveform;
