import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from './connection';

class CardPurchase extends Model { };

CardPurchase.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    card: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'CardPurchase'
});
 
export default CardPurchase;