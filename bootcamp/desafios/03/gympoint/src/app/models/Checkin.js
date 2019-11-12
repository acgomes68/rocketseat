import { Model } from 'sequelize';

class Checkin extends Model {
  static init(sequelize) {
    super.init(null, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Checkin;
