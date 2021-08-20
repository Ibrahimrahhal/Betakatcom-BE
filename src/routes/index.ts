import user from "./user";
import users from "./users";
import authentication from "./authentication";
import transaction from "./transaction";
import cardType from "./cardType";

export const PrivateRoutes = [user, users, transaction, cardType];
export const PublicRoutes = [authentication];
