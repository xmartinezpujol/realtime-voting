var express = require('express');
var app = express();
var io = require('socket.io')();

app.set('port', process.env.PORT || 5000);

app.locals.siteTitle = 'Voting App';

var server = app.listen(app.get('port'),
  () => console.log('Escuchando a puerto ' + app.get('port'))
);

