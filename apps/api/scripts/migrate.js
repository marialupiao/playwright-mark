const database = require('../src/database');

database()
  .then((connection) => connection.runMigrations())
  .then(() => console.log('Database migrations completed.'))
  .catch((error) => {
    console.error('Database migration failed:', error);
    process.exitCode = 1;
  });
