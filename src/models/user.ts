import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from './connection';

class User extends Model { };

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
    wallet: {
        type: DataTypes.INTEGER,
    },
    createdOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'User'
});
 
export default User;