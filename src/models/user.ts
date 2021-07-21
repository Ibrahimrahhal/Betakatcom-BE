import { Model, DataTypes, Sequelize } from "sequelize";
import SequelizeInstance from "./connection";
import UserType from "./userType";
import Wallet from "./wallet";
import { crypto } from "../utils";
class User extends Model {
  getAsJson() {
    const user: any = this.toJSON();
    delete user.password;
    return user;
  }
  verifyPass(password: string): boolean {
    const currentPassword = this.get("password");
    return crypto.hash(password) === currentPassword;
  }

  isAdmin() {
    const adminId = UserType.adminId;
    return this.get("type") == adminId;
  }

  isSeller() {
    const sellerId = UserType.sellerId;
    return this.get("type") == sellerId;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
