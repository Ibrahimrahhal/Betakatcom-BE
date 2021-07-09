import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from './connection';

class TransactionType extends Model { };

TransactionType.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'TransactionType'
});
 
export default TransactionType;