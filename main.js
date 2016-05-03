/**
* FileHub
*
* Copyright (c) 2016 David Youster
*
* Made available under the terms of the MIT license. See LICENSE.txt for more
* information.
*/

const fs = require('fs');
const server = require('./server');

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

server.startServing();