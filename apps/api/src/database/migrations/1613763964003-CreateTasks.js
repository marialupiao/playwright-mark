const { Table } = require('typeorm');

class CreateTasks1613763964003 {
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      name: 'tasks',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'name', type: 'varchar' },
        { name: 'is_done', type: 'boolean' },
        { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
      ],
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tasks');
  }
}

module.exports = { CreateTasks1613763964003 };
