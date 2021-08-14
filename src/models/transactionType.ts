import { Model, DataTypes } from "sequelize";
import SequelizeInstance from "./connection";

class TransactionType extends Model {
  
  static get types(): TransactionType[] {
    return [
      { id: this.creditPurchase, name: "Credit Purchase" },
      { id: this.cardPurchase, name: "Card Purchase" },
    ].map((type) => new TransactionType(type));
  }

  static get creditPurchase(): number {
    return 1;
  }

  static get cardPurchase(): number {
    return 2;
  }

}

TransactionType.init(
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
    modelName: "TransactionType",
  }
);

export default TransactionType;
