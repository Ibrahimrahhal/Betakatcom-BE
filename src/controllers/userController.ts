import { User, UserType } from "../models";

export default class UserController {
  private constructor() {}

  public static getSellers() {
    return User.findAll({
      where: { id: UserType.sellerId },
    });
  }
}
