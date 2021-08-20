import user from "./user";
import users from "./users";
import authentication from "./authentication";
import transaction from "./transaction";

export const PrivateRoutes = [user, users, transaction];
export const PublicRoutes = [authentication];
