const yup = require('yup');
const { AppError } = require('../errors/AppError');
const { getTasksRepository } = require('../repositories/TasksRespository');

class TaskController {
  async show(request, response) {
    const tasks = await getTasksRepository().find({
      order: { created_at: 'ASC' },
    });
    return response.status(200).json(tasks);
  }

  async create(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
      is_done: yup.boolean().required().oneOf([false], 'The task cannot be registered as completed.'),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.message);
    }

    const repository = getTasksRepository();
    const taskAlreadyExists = await repository.findOneBy({ name: request.body.name });
    if (taskAlreadyExists) {
      throw new AppError('Task already exists!');
    }

    await repository.save(repository.create({
      name: request.body.name,
      is_done: request.body.is_done,
    }));
    return response.status(201).end();
  }

  async remove(request, response) {
    await getTasksRepository().delete({ id: request.params.id });
    return response.status(204).end();
  }

  async update(request, response) {
    try {
      await yup.object({ is_done: yup.boolean().required() })
        .validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.message);
    }

    const repository = getTasksRepository();
    const task = await repository.findOneBy({ id: request.params.id });
    if (!task) {
      throw new AppError('Task not found!', 404);
    }

    await repository.update(request.params.id, { is_done: request.body.is_done });
    return response.status(200).json(task);
  }

  async removeByName(request, response) {
    try {
      await yup.object({ name: yup.string().required() })
        .validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.message);
    }

    await getTasksRepository().delete({ name: request.body.name });
    return response.status(204).end();
  }

  async removeByName2(request, response) {
    await getTasksRepository().delete({ name: request.params.task_name });
    return response.status(204).end();
  }
}

module.exports = { TaskController };
