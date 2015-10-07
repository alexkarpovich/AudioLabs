'use strict';

var React = require('react');
var StageItem = require('./stage-item');
var StageStore = require('../../../stores/stage-store');

var PitchStages = React.createClass({
	getInitialState: function () {
		return {stages: StageStore.getPitchStages()};
	},
	render: function () {
		
		var items = this.state.stages.map(function (item) {
			return (
				<StageItem id={item.id} />
			);
		});

		return (
			<div className="pitch-stages row">
				{items}
			</div>
		);
	}
});

module.exports = PitchStages;
