
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(require('less-middleware')({
    src: __dirname + '/public',
    yuicompress: true
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')), { maxAge: 86400000 });
app.use(function (req, res) {
    res.render('error', {nav: true});
});

app.get('/', routes.index);
app.get('/projects', routes.project_index);
app.get('/writing', routes.writing);
app.get('/resume', routes.resume);

app.get('/projects/:filename', routes.project_detail);
app.get('/writing/:filename', routes.writing_detail);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// this will prevent heroku from sleeping
setInterval(function () {
    http.get('http://ben-burwell-com.herokuapp.com/', function (res) {
        console.log('Got home page');
    });
}, 45 * 60 * 1000);
