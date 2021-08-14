import UserType from "./userType";
import TranscationType from "./transactionType";

export const Sync = () => {
  const modalToSync = [UserType, TranscationType];
  modalToSync.forEach((modal) => {
    modal.types.forEach(async (type) => {
      await modal.findOrCreate({
        where: { id: type.get("id") },
        defaults: {
          ...type.toJSON(),
        },
      });
    });
  })
};
