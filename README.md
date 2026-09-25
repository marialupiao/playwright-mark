# 🎭 Playwright Mark

Testes automatizados com **Playwright** para o Mark, um gerenciador de tarefas com frontend estático e API REST.

## 🧰 Requisitos

- **Node.js** 20 ou superior
- **Yarn Classic** 1.22.x
- Navegador **Chromium** do Playwright

## 🚀 Instalação

Na raiz do projeto, instale as dependências:

```bash
yarn install
yarn --cwd apps/api install
yarn --cwd apps/web install
yarn playwright install chromium
```

## 💻 Executar a aplicação

Inicie a API e o frontend em **terminais separados**, a partir da raiz:

```bash
yarn start:api
```

```bash
yarn start:web
```

| Serviço | Endereço |
| --- | --- |
| 🖥️ Frontend | <http://localhost:8080> |
| ⚙️ API | <http://localhost:3333> |

### 🗄️ Banco de dados

A API usa SQLite em `apps/api/src/database/database.sqlite` e aplica as migrações ao iniciar. Para executá-las manualmente:

```bash
yarn db:init
```

Para apagar as tabelas do banco local:

```bash
yarn db:drop
```

> ⚠️ `db:drop` apaga os dados do banco configurado. Use com cuidado.

## 🧪 Testes

Execute os testes da API:

```bash
yarn test:api
```

Execute os testes end-to-end com Playwright:

```bash
yarn test:e2e
```

O `playwright.config.ts` inicia a API e o frontend automaticamente caso ainda não estejam ativos.

Para executar todos os testes:

```bash
yarn test
```

> 🌐 O projeto usa Chromium por padrão. Instale o navegador uma vez com `yarn playwright install chromium`.

## 🗂️ Estrutura do projeto

```text
apps/
  api/       API Express, SQLite/TypeORM e testes da API
  web/       Frontend estático do Mark
tests/       Testes end-to-end com Playwright
playwright.config.ts
```

## 🔌 Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/tasks` | Lista as tarefas |
| `POST` | `/tasks` | Cria uma tarefa |
| `PUT` | `/tasks/:id` | Atualiza o estado de conclusão |
| `DELETE` | `/tasks/:id` | Remove uma tarefa |

Os endpoints auxiliares de limpeza usados pelos testes ficam disponíveis fora do ambiente `production`.

## 🔧 Configuração local

- Arquivos `.env` e bancos SQLite são locais e não devem ser enviados ao repositório.
- A API usa a porta `3333` por padrão. Use a variável `PORT` para alterá-la.
- Para iniciar a API sem aplicar migrações, defina `RUN_MIGRATIONS=false`.
