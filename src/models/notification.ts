import { Model, DataTypes } from "sequelize";
import SequelizeInstance from './connection';

class Notification extends Model { };

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    details: {
        type: DataTypes.STRING,
    },
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'Notification'
});
 
export default Notification;