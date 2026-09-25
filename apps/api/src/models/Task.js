const { EntitySchema } = require('typeorm');
const { v4: uuid } = require('uuid');

class Task {
  constructor() {
    this.id = this.id || uuid();
  }
}

const taskSchema = new EntitySchema({
  target: Task,
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
    },
    name: {
      type: 'varchar',
    },
    is_done: {
      type: 'boolean',
    },
    created_at: {
      type: 'datetime',
      createDate: true,
      default: 'CURRENT_TIMESTAMP',
    },
  },
});

module.exports = { Task, taskSchema };
