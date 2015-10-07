'use strict';

var React = require('react/addons');
var StageStoreAction = require('../../../actions/stage-store/stage-store');

var StageItem = React.createClass({
	setPitchStage: function () {
		StageStoreAction.setActivePitchStage(this.props.data.id);

		this.setState({});
	},

	render: function () {
		var cx = React.addons.classSet;
		var classes = cx({
			'btn btn-block': true,
			'btn-warning': !this.props.data.isDone && !this.props.data.isActive,
			'btn-success': this.props.data.isDone && !this.props.data.isActive,
			'btn-primary': this.props.data.isActive
		});

		return (
			<ul className="col-sm-4 col-md-4 col-lg-4">
				<span className={classes} onClick={this.setPitchStage}>{this.props.data.title}</span>
			</ul>
		);
	}
});

module.exports = StageItem;
