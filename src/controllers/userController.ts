import { Transaction } from "sequelize";
import UserType from "../models/userType";
import User from "../models/user";
import Wallet from "./WalletController";

export default class UserController {
  private constructor() {}

  public static getSellers(): Promise<User[]> {
    return User.findAll({
      where: { type: UserType.sellerId, deletedOn: null },
    });
  }

  public static getSellingPoints(): Promise<User[]> {
    return User.findAll({
      where: { type: UserType.sellingPointId, deletedOn: null },
    });
  }

  public static update(user: any) {
    return User.update(user, {
      where: { id: user.id },
    });
  }

  public static async create(user: any, type: number, intialBalance: number = 0): Promise<User> {
    if (type === UserType.sellingPointId) {
      const wallet = await Wallet.create(intialBalance);
      user.wallet = wallet.get("id");
    }
    return await User.create({ ...user, type });
  }

  public static delete(id: string) {
    return User.update(
      { deletedOn: Date.now() },
      {
        where: { id },
      }
    );
  }

  public static get(username: string): Promise<User | null> {
    return User.findOne({ where: { username } });
  }

  public static getById(id: number, transaction?: Transaction): Promise<User | null> {
    return User.findOne({ where: { id } });
  }
}
