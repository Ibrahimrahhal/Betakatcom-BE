import UserType from "./userType";

export const Sync = () => {
  UserType.types.forEach(async (type) => {
    await UserType.findOrCreate({
      where: { id: type.get("id") },
      defaults: {
        ...type.toJSON(),
      },
    });
  });
};
