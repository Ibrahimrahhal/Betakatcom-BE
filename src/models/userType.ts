import { Model, DataTypes } from "sequelize";
import SequelizeInstance from "./connection";

class UserType extends Model {}

UserType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeInstance,
    modelName: "UserType",
  }
);

export default UserType;
