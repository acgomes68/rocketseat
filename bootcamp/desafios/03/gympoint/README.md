# rocketseat
## gostack
### desafios
Backend da aplicação GymPoint usando Node.js com Express.js na arquitetura MVC e o Postgres como base de dados SQL. 
Para controle de fila de envio de e-mail foi utilizado o Redis.

Foram utilizados containers Docker para o Node, Postgres e Redis em versões Alpine Linux.

Nesse momento foram criadas as funcionalidades restritas de gestão de planos e matrículas, além das funcionalidades públicas de checkins e pedidos de auxílio. 

Em todos os casos citados envolveram a criação de migrations, seeds, models, controllers e atualização de rotas públicas e restritas.

Para atutenticação das rotas restritas foi utilizado o JWT.

No que diz respeito ao controle e captura de exceções foram utilizados blocos try/catch em conjunto com a biblioteca Youch para o ambiente DEV e a biblioteca sentry para o ambiente PRD.

De forma mais detalhada, foram utilizados os seguintes plugins, componentes e bibliotecas:
- @sentry/node: captura de exceções em ambiente PRD;
- bcryptjs: geração de hashes utilizados no armazenamento de senhas;
- bee-queue: gestão de filas de execução e integração com Redis;
- date-fns: manipulação, formatação e cálculos com datas e horas;
- dotenv: manipulação de variáveis de ambiente;
- eslint padrão AirBnB, prettier, editorconfig (vsCode plugin) e sucrase: estilização, formatação e padronização de código;
- jsonwebtoken: autenticação, controle de sessão e verificação de acesso às rotas restritas;
- nodemailer: envio de e-mail através do Node.js;
- nodemon: execução do node como serviço em background para ambiente DEV;
- pg: integração com Postgres;
- sequelize: ORM para abstração e persistência da camada de dados (model), criação e gerenciamento de migrations e seeds;
- youch: captura de exceções em ambiente DEV;
- yup: validação e consistência dos dados de entrada;

Estrutura de diretórios:
```
├── src
├── ├── app
├── │   ├── controllers
├── │   │   ├── CheckinController.js
├── │   │   ├── HelpOrderController.js
├── │   │   ├── PlanController.js
├── │   │   ├── RegistrationController.js
├── │   │   ├── SessionController.js
├── │   │   ├── StudentController.js
├── │   │   └── UserController.js
├── │   ├── jobs
├── │   │   ├── HelpOrderMail.js
├── │   │   └── RegistrationMail.js
├── │   ├── middlewares
├── │   │   └── auth.js
├── │   ├── models
├── │   │   ├── Checkin.js
├── │   │   ├── HelpOrder.js
├── │   │   ├── Plan.js
├── │   │   ├── Registration.js
├── │   │   ├── Student.js
├── │   │   └── User.js
├── │   └── views
├── │       └── emails
├── │           ├── layouts
├── │           │   └── default.hbs
├── │           ├── partials
├── │           │   └── footer.hbs
├── │           ├── helpOrder.hbs
├── │           └── registration.hbs
├── ├── config
├── │   ├── auth.js
├── │   ├── database.js
├── │   ├── mail.js
├── │   ├── redis.js
├── │   └── sentry.js
├── ├── database
├── │   ├── migrations
├── │   │   ├── 20191022083937-create-users.js
├── │   │   ├── 20191029055637-create-students.js
├── │   │   ├── 20191029075358-create-plans.js
├── │   │   ├── 20191029075419-create-registrations.js
├── │   │   ├── 20191029075444-create-checkins.js
├── │   │   └── 20191029075500-create-help_orders.js
├── │   ├── seeds
├── │   │   ├── 20191025050052-admin-user.js
├── │   │   └── 20191029075819-basic-plans.js
├── │   └── index.js
├── ├── lib
├── │   ├── Mail.js
├── │   └── Queue.js
├── ├── app.js
├── ├── queue.js
├── ├── routes.js
├── └── server.js.dockerignore
├── .editorconfig
├── .env
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── .sequelizerc
├── docker-compose.yml
├── Dockerfile
├── nodemon.json
├── package.json
├── README.md
└── yarn.lock```
