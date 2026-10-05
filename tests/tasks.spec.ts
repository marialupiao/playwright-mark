import { test, expect } from '@playwright/test';

import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TaskPage } from './support/pages/tasks';

import data from './fixtures/tasks.json'

let taskPage: TaskPage

test.beforeEach(({ page }) => {
    taskPage = new TaskPage(page)
})

test.describe('Cadastro de tarefas', () => {
    test('deve poder cadastrar uma nova tarefa com tecla Enter', async ({ request }) => {

        const task = data.enter as TaskModel

        await taskPage.go() // Navega para a página de tarefas

        await deleteTaskByHelper(request, task.name) // Deleta a tarefa caso ela exista

        await taskPage.enter(task) // Cadastra a tarefa com tecla Enter

        await taskPage.shouldHaveText(task.name) // Verifica se a tarefa foi cadastrada
    })

    test('deve poder cadastrar uma nova tarefa com o botão Create', async ({ request }) => {

        const task = data.success as TaskModel

        await taskPage.go() // Navega para a página de tarefas

        await deleteTaskByHelper(request, task.name) // Deleta a tarefa caso ela exista

        await taskPage.create(task) // Cadastra a tarefa

        await taskPage.shouldHaveText(task.name) // Verifica se a tarefa foi cadastrada
    })

    test('não deve permitir cadastrar uma tarefa duplicada', async ({ request }) => {

        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name) // Deleta a tarefa caso ela exista

        await postTask(request, task) // Cadastra a tarefa via API


        await taskPage.go() // Navega para a página de tarefas
        await taskPage.create(task) // Tenta cadastrar a mesma tarefa novamente

        await taskPage.alertHaveText('Task already exists!') // Verifica se o alerta de tarefa duplicada foi exibido


    })

    test('campo obrigatório', async () => {
        const task = data.required as TaskModel

        await taskPage.go() // Navega para a página de tarefas
        await taskPage.create(task) // Tenta cadastrar a tarefa com campo vazio

        const validationMessage = await taskPage.inputTaskName.evaluate(
            element => (element as HTMLInputElement).validationMessage
        )
        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('Atualização de tarefas', () => {

    test('deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name) // Deleta a tarefa caso ela exista
        await postTask(request, task) // Cadastra a tarefa via API
        // Ao deletar e cadastrar a tarefa via API, garantimos que a tarefa estará presente na lista de tarefas sempre no status "não concluída" (is_done: false)

        await taskPage.go() // Navega para a página de tarefas
        await taskPage.toggle(task.name) // Marca a tarefa como concluída
        await taskPage.shouldBeDone(task.name) // Verifica se a tarefa foi concluída

    })
})

test.describe('Remoção de tarefas', () => {
    test('deve remover uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name) // Deleta a tarefa caso ela exista
        await postTask(request, task) // Cadastra a tarefa via API
        // Ao deletar e cadastrar a tarefa via API, garantimos que a tarefa estará presente na lista de tarefas sempre no status "não concluída" (is_done: false)

        await taskPage.go() // Navega para a página de tarefas
        await taskPage.remove(task.name) // Remove a tarefa
        await taskPage.shouldNotExist(task.name) // Verifica se a tarefa foi removida

    })
})
