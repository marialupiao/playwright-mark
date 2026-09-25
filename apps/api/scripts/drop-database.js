const database = require('../src/database');

database()
  .then((connection) => connection.dropDatabase())
  .then(() => console.log('Database dropped.'))
  .catch((error) => {
    console.error('Database drop failed:', error);
    process.exitCode = 1;
  });
