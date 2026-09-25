import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// test('deve poder cadastrar uma nova tarefa com tecla Enter', async ({ page }) => {
//     await page.goto('http://localhost:8080')

//     const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
//     await expect(inputTaskName).toBeVisible()
//     await inputTaskName.fill(faker.lorem.words(3))
//     await inputTaskName.press('Enter')

// })

test('deve poder cadastrar uma nova tarefa com o botão Create', async ({ page, request }) => { 


    const taskName = 'Ler um livro sobre testes de software'

    await request.delete('http://localhost:3333/helper/tasks/' + taskName) // Limpa as tarefas antes de iniciar o teste
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await expect(inputTaskName).toBeVisible()
    await inputTaskName.fill(taskName)
   // await inputTaskName.fill(faker.lorem.words(3))
   // await page.click('xpath=//button[contains(text(), "Create")]') // com xpath
    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item >> text=${taskName}`)
    await expect(target).toBeVisible()
})