'use strict';

var React = require('react');

var StageItem = React.createClass({
	render: function () {
		return (
			<ul className="col-sm-4 col-md-4 col-lg-4">
				<span className="btn btn-warning btn-block">{this.props.data.title}</span>
			</ul>
		);
	}
});

module.exports = StageItem;
