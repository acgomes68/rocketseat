import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    const postgresConfig = databaseConfig.postgres;
    this.connection = new Sequelize(postgresConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const mongoConfig = databaseConfig.mongo;
    this.mongoConnection = mongoose.connect(
      `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
