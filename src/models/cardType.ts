import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from './connection';

class CardType extends Model { };

CardType.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nameArabic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameEnglish: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    deletedOn: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: SequelizeInstance, 
    modelName: 'CardType'
});
 
export default CardType;