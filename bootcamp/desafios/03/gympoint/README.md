# rocketseat
## gostack
### desafios
Backend da aplicação <strong>GymPoint</strong> usando <strong>Node.js</strong> com <strong>Express.js</strong> na arquitetura <strong>MVC</strong> e o <strong>Postgres</strong> como base de dados <strong>SQL</strong>. 
Para controle de fila de envio de e-mail foi utilizado o <strong>Redis</strong>.

Foram utilizados containers <strong>Docker</strong> para o <strong>Node</strong>, <strong>Postgres</strong> e <strong>Redis</strong> em versões <strong>Alpine Linux</strong>.

Nesse momento foram criadas as <strong>funcionalidades restritas de gestão de planos e matrículas</strong>, além das <strong>funcionalidades públicas de checkins e pedidos de auxílio</strong>. 

Em todos os casos citados envolveram a criação de <strong>migrations, seeds, models, controllers e atualização de rotas públicas e restritas</strong>.

Para atutenticação das rotas restritas foi utilizado o <strong>JWT</strong>.

No que diz respeito ao controle e captura de exceções foram utilizados <strong>blocos try/catch</strong> em conjunto com a <strong>biblioteca Youch</strong> para o <strong>ambiente DEV</strong> e a <strong>biblioteca sentry</strong> para o <strong>ambiente PRD</strong>.

De forma mais detalhada, foram utilizados os seguintes plugins, componentes e bibliotecas:
- <strong>@sentry/node</strong>: captura de exceções em ambiente PRD;
- <strong>bcryptjs</strong>: geração de hashes utilizados no armazenamento de senhas;
- <strong>bee-queue</strong>: gestão de filas de execução e integração com Redis;
- <strong>date-fns</strong>: manipulação, formatação e cálculos com datas e horas;
- <strong>dotenv</strong>: manipulação de variáveis de ambiente;
- <strong>eslint padrão AirBnB, prettier, editorconfig (vsCode plugin) e sucrase</strong>: estilização, formatação e padronização de código;
- <strong>jsonwebtoken</strong>: autenticação, controle de sessão e verificação de acesso às rotas restritas;
- <strong>nodemailer</strong>: envio de e-mail através do Node.js;
- <strong>nodemon</strong>: execução do node como serviço em background para ambiente DEV;
- <strong>pg</strong>: integração com Postgres;
- <strong>sequelize</strong>: ORM para abstração e persistência da camada de dados (model), criação e gerenciamento de migrations e seeds;
- <strong>youch</strong>: captura de exceções em ambiente DEV;
- <strong>yup</strong>: validação e consistência dos dados de entrada;
<br /><br />

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
└── yarn.lock
