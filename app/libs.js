var bower_components = './bower_components/';

module.exports = function (min) {
    var min = min ? '.min' : '';

    return [
        bower_components + 'alertify.js/lib/alertify' + min + '.js'
    ];
};