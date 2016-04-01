const requestHandlers = require('./requestHandlers');

const handle = {};
handle['/'] = requestHandlers.index;
handle['/index'] = requestHandlers.index;
handle['/home'] = requestHandlers.index;
handle['/upload'] = requestHandlers.upload;
handle['/f'] = requestHandlers.getFile;
handle['/s'] = requestHandlers.serveStaticFile;
handle['/d'] = requestHandlers.deleteFile;
handle[404] = requestHandlers.status404;

function route(pathname, query, response, request) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request, query);
  } else {
    console.log('Request for ' + pathname + ' returned 404');
    handle[404](response);
  }
}

module.exports.route = route;