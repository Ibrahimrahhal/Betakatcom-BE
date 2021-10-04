import { Model, DataTypes } from "sequelize";
import SequelizeInstance from "./connection";

class TransactionType extends Model {
  static get types(): TransactionType[] {
    return [
      { id: this.creditPurchase, name: "Credit Purchase" },
      { id: this.cardPurchase, name: "Card Purchase" },
      { id: this.creditSelling, name: "Credit Selling" },
      { id: this.ballancePay, name: "Ballance Pay" },
      { id: this.addDept, name: "Add Dept" },
      { id: this.payDept, name: "Pay Dept" },
    ].map((type) => new TransactionType(type));
  }

  static get creditPurchase(): number {
    return 1;
  }

  static get cardPurchase(): number {
    return 2;
  }

  static get creditSelling(): number {
    return 3;
  }

  static get ballancePay(): number {
    return 4;
  }

  static get addDept(): number {
    return 5;
  }

  static get payDept(): number {
    return 6;
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
