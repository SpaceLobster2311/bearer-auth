'use strict';

// Start up DB Server
require('dotenv').config();

const server = require('./src/server.js')
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {

    // Start the web server
    server.start(PORT);
  });