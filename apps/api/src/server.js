require('dotenv').config();
const { app } = require('./app');
const database = require('./database');

async function start() {
  const connection = await database();
  if (process.env.RUN_MIGRATIONS !== 'false') {
    await connection.runMigrations();
  }
  const port = Number(process.env.PORT || 3333);
  app.listen(port, () => console.log(`Server is running on port ${port}!`));
}

start().catch((error) => {
  console.error('Unable to start API:', error);
  process.exitCode = 1;
});
