'use strict';

var React = require('react');
var Content = require('./content');
var Header = require('./header');
var StageStore = require('../../../stores/stage-store');

function getStoreById(id) {
    return {stage: StageStore.getStageById(id)};
}

var Page = React.createClass({
    getInitialState: function() {
        return getStoreById(this.props.params.id);
    },
    componentDidMount: function() {
        StageStore.addChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getStoreById(this.props.params.id));
    },
    render: function() {
        var stage = this.state.stage;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <Header header={stage.header} short={stage.short}/>
                </div>
                <div className="panel-body">
                    <Content source={stage.description} />
                </div>
                <div className="panel-footer"></div>
            </div>
        );
    }
});

module.exports = Page;
