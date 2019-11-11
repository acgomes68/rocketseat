import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';

import databaseConfig from '../config/database';

const models = [User, Student, Checkin, HelpOrder, Plan, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const postgresConfig = databaseConfig.postgres;
    this.connection = new Sequelize(postgresConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
