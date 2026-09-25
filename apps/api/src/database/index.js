const path = require('path');
const { DataSource } = require('typeorm');
const { taskSchema } = require('../models/Task');
const { CreateTasks1613763964003 } = require('./migrations/1613763964003-CreateTasks');

const databasePath = process.env.NODE_ENV === 'test'
  ? path.join(__dirname, 'database.test.sqlite')
  : path.join(__dirname, 'database.sqlite');

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: databasePath,
  entities: [taskSchema],
  migrations: [CreateTasks1613763964003],
  synchronize: false,
});

async function database() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource;
}

module.exports = database;
module.exports.AppDataSource = AppDataSource;
