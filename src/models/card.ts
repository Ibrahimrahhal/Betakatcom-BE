import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from './connection';

class Card extends Model { };

Card.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'Card'
});
 
export default Card;