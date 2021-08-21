import { Router } from "express";
import { generic } from "../utils";
import userController from "../controllers/userController";

const app = Router({ mergeParams: true });

app.get("/", (req, res) => {
  res.json((req as any).user.toJSON());
});

app.post("/", (req, res) => {
  res.json((req as any).user.toJSON());
});

app.put(
  "/change-password",
  generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { user } = req as any;
    userController.changePassword(user.id, oldPassword, newPassword);
    res.json({});
  })
);
export default generic.encapsulateRouter(app, "/user");
