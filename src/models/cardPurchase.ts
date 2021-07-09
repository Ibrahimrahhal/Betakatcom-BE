import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from "./connection";
import Card from "./card";
import User from "./user";

class CardPurchase extends Model {}

CardPurchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    card: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Card,
        key: "id",
      },
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize: SequelizeInstance,
    modelName: "CardPurchase",
  }
);

export default CardPurchase;
