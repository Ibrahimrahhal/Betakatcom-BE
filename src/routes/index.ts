import user from "./user";
import users from "./users";
import authentication from "./authentication";
import transaction from "./transaction";
import cardType from "./cardType";
import card from "./card";

export const PrivateRoutes = [user, users, transaction, cardType, card];
export const PublicRoutes = [authentication];
