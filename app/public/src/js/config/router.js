'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var createHashHistory = require('history/lib/createHashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Layout = require('../app-layout');
var Container = require('../components/container');
var Page = require('../components/stage/content/page');
var Home = require('../components/home');
var Page404 = require('../components/page404');

module.exports = (
    <Router>
        <Route path="/" component={Layout} >
            <IndexRoute component={Home} />
            <Route path="stage" component={Container} >
                <Route path=":id" component={Page} />
            </Route>
            <Route path="*" component={Page404} />
        </Route>
    </Router>
);
