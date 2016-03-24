const querystring = require('querystring');

const parse = function parse(postData) {
  return querystring.parse(postData);
}

module.exports.parse = parse;