require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 4242;
server.listen(port, function() {
  console.log(`***Listening on http://localhost:${port} ***`);
});
