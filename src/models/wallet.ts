import { Model, DataTypes } from "sequelize";
import SequelizeInstance from "./connection";

class Wallet extends Model {}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: SequelizeInstance,
    modelName: "Wallet",
  }
);

export default Wallet;
