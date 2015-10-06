'use strict';

var React = require('react');
var router = require('./config/router');
window.jQuery = require('jquery');
require('bootstrap');
require('midi');

React.render(router, document.getElementById('app'));
