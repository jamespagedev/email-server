require('dotenv').config();
const server = require('./servers/server.js');

const port = process.env.PORT || 5012;
server.listen(port, () =>
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
);
