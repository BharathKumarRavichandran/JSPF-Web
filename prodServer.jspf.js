const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

// This assumes that all your app files
// `public` directory relative to where your server.js is
app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');
	next();
});

app.get('*.css', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/css');
	next();
});

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


app.listen(port);
console.log('Server started on port ' + port);
