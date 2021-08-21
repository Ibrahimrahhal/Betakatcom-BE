import { Transaction } from "sequelize";
import UserType from "../models/userType";
import User from "../models/user";
import Wallet from "./WalletController";
import Crypto from "../utils/crypto";
export default class UserController {
  private constructor() {}

  public static getSellers(): Promise<User[]> {
    return User.findAll({
      where: { type: UserType.sellerId, deletedOn: null },
    });
  }

  public static getSellingPoints(createdBy?: number): Promise<User[]> {
    return User.findAll({
      where: {
        type: UserType.sellingPointId,
        createdBy,
        deletedOn: null,
      },
    });
  }

  public static update(user: any) {
    return User.update(user, {
      where: { id: user.id },
    });
  }

  public static async create(user: any, type: number, intialBalance: number = 0): Promise<User> {
    if ([UserType.sellingPointId, UserType.sellerId].includes(type)) {
      const wallet = await Wallet.create(intialBalance);
      user.wallet = wallet.get("id");
    }
    user.password = Crypto.hash(user.password);
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
    return User.findOne({ where: { id }, transaction });
  }

  public static async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.getById(userId);
    if (!user) throw new Error("User Not Found");
    if (user.get("password") !== Crypto.hash(oldPassword)) throw new Error("Password Error");
    await User.update({ password: newPassword }, { where: { id: userId } });
  }
}
