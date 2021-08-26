import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from "./connection";

class CardType extends Model {}

CardType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameArabic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      references: {
        model: CardType,
        key: "id",
      },
    },
    nameEnglish: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(4000),
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
    deletedOn: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: SequelizeInstance,
    modelName: "CardType",
  }
);

export default CardType;
