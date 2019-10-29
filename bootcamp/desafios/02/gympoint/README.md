# rocketseat
## gostack
### desafios
Backend da aplicação GymPoint usando Node.js com Express.js na arquitetura MVC e o Postgres como base de dados SQL instalado como container Docker. Nesse momento foram criadas as funcionalidades de gestão de alunos envolvendo migration, seed, model, controller e as rotas com CRUD.
Complementando foram utilizados os seguintes plugins e componentes:
- ESLint padrão AirBnB, Prettier, EditorConfig e Sucrase: estilização, formatação e padronização de código;
- Sequelize: ORM para abstração da camada de dados (model), criação e gerenciamento de migrations e seeds;
- JWT: autenticação, controle sessão e verificação de acesso às rotas restritas;
- bcryptjs: geração de hashes utilizados no armazenamento de senhas;
- yup: validação e consistência dos dados de entrada;

Estrutura de diretórios:
- src
  - app
    - controllers
    - middlewares
    - models
  - config
  - database
    - migrations
    - seeds
  app.js
  routes.js
  server.js
