'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Layout = require('./app-layout');
var Container = require('./components/container');
var Home = require('./components/home');
var Page404 = require('./components/page404');
window.jQuery = require('jquery');
require('bootstrap');

React.render((
    <Router>
        <Route name="app" path="/" component={Layout} >
            <Route name="home" path="/" component={Home} />
            <Route name="container" path="/container" component={Container} />
            <Route name="page404" path="*" component={Page404} />
        </Route>
    </Router>
), document.getElementById('app'));
