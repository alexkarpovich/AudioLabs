'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Layout = require('../app-layout');
var Home = require('../components/home');
var Panel = require('../components/panel/panel');
var Introduction = require('../components/panel/stages/introduction/introduction');
var MusicalIntervals = require('../components/panel/stages/musical-intervals/musical-intervals');
var PitchDetection = require('../components/panel/stages/pitch-detection/pitch-detection');
var Page404 = require('../components/page404');

module.exports = (
    <Router>
        <Route path="/" component={Layout} >
            <IndexRoute component={Home} />
            <Route path="stages" component={Panel} >
                <IndexRoute component={Introduction} />
                <Route path="introduction" component={Introduction} />
                <Route path="musical-intervals" component={MusicalIntervals} />
                <Route path="pitch-detection" component={PitchDetection} />
            </Route>
            <Route path="*" component={Page404} />
        </Route>
    </Router>
);
