import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from "./connection";

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userEffected: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize: SequelizeInstance,
    modelName: "Transaction",
  }
);

export default Transaction;
