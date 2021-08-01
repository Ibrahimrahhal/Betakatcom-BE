import { User, UserType } from "../models";

export default class UserController {
  private constructor() {}

  public static getSellers() {
    return User.findAll({
      where: { id: UserType.sellerId },
    });
  }

  public static update(user: any) {
    return User.update(user, {
      where: { id: user.id },
    });
  }

  public static create(user: any) {
    return User.create(user);
  }
}
