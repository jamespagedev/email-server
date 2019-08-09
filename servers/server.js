//========================================== dependencies ==========================================
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('../middleware/errorHandler.js');

const server = express();

//=========================================== middleware ===========================================
server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan('short')); // logging middleware
server.use(cors()); // allows domains/ports to connect to your server

//============================================= routes =============================================
server.get('/', (req, res) => {
  res.sendFile('docs.html', { root: './public' }); // Make README.md the home page
});

const mainEmailRouter = require('./routes/mainEmailRouter.js');

server.use('/main-email', mainEmailRouter);

server.use(errorHandler); // This line needs to be after all routes

//============================================= export =============================================
module.exports = server;
