'use strict';

var React = require('react/addons');
var StageStore = require('../../../stores/stage-store');
var StageStoreConstants = require('../../../constants/stage-store/stage-store');
var StageStoreAction = require('../../../actions/stage-store/stage-store');

var StageItem = React.createClass({
	getInitialState: function () {
		return {stage: StageStore.getPitchStageById(this.props.id)};
	},

	componentWillMount: function() {
		StageStore.subscribe(StageStoreConstants.PITCH_STAGE_CHANGED, this._onChangePitchStage);
	},

	_onChangePitchStage: function () {
		this.setState({stage: StageStore.getPitchStageById(this.props.id)});
	},

	setPitchStage: function () {
		StageStoreAction.setActivePitchStage(this.props.id);

		this.setState({});
	},

	render: function () {
		var cx = React.addons.classSet;
		var classes = cx({
			'btn btn-block': true,
			'btn-warning': !this.state.stage.isDone && !this.state.stage.isActive,
			'btn-success': this.state.stage.isDone && !this.state.stage.isActive,
			'btn-primary': this.state.stage.isActive
		});

		return (
			<ul className="col-sm-4 col-md-4 col-lg-4">
				<span className={classes} onClick={this.setPitchStage}>{this.state.stage.title}</span>
			</ul>
		);
	}
});

module.exports = StageItem;
