'use strict';

var React = require('react');
var router = require('./config/router');
window.jQuery = require('jquery');
require('bootstrap');

React.render(router, document.getElementById('app'));
