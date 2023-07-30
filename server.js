// const express = require('express');
// const routes = require('./routes');

// const app = express();
// const port = 9000;

// app.use(express.json());
// app.use('/', routes);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err);
  process.exit(1);
});

init();


