import { User, UserType } from "../models";

export default class UserController {
  private constructor() {}

  public static getSellers() {
    return User.findAll({
      where: { type: UserType.sellerId, deletedOn: null },
    });
  }

  public static update(user: any) {
    return User.update(user, {
      where: { id: user.id },
    });
  }

  public static create(user: any, type: number) {
    return User.create({...user, type});
  }

  public static delete(id: string) {
    return User.update({deletedOn: Date.now()}, {
      where: { id },
    });
  }
}
