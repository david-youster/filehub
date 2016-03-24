const requestHandlers = require('./requestHandlers');

const handle = {};
handle['/'] = requestHandlers.index;
handle['/index'] = requestHandlers.index;
handle['/home'] = requestHandlers.index;
handle['/upload'] = requestHandlers.upload;
handle[404] = requestHandlers.status404;

const route = function route(pathname, response) {
  console.log('Routing request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    handle[404](response);
  }
}

module.exports.route = route;