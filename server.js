'use strict';

// # NodeJS Basic Server.
//
// This server can be extended to build a RESTful API or interface with core Datahub APIs. It uses
// `restify` as a server scaffolding framework, similar to ExpressJS.

var restify = require('restify');
var fs = require('fs');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());

// Rewrite the index request
server.pre(function(req, res, next) {
  if (req.url === '/') {
    req.url = 'index.html';
  }
  return next();
});

// Serves any static assets that exist if requested
server.get(/\/*/, restify.serveStatic({
  directory: './'
}));

// Start the server.
server.listen(4000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
