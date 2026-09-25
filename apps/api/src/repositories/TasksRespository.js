const { AppDataSource } = require('../database');
const { Task } = require('../models/Task');

function getTasksRepository() {
  if (!AppDataSource.isInitialized) {
    throw new Error('Database is not initialized');
  }

  return AppDataSource.getRepository(Task);
}

module.exports = { getTasksRepository };
