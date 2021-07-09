import { Model, DataTypes } from "sequelize";
import SequelizeInstance from './connection';

class NotificationType extends Model { };

NotificationType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'NotificationType'
});
 
export default NotificationType;