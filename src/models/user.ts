import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from "./connection";
import UserType from "./userType";
import Wallet from "./wallet";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserType,
        key: "id",
      },
    },
    wallet: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: Wallet,
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
    modelName: "User",
  }
);

export default User;
