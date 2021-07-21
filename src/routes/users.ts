import { Router } from "express";
import { generic } from "../utils";
import { HTTP_RESPONSES } from "../utils/constants";
import { userController } from "../controllers";

const app = Router({ mergeParams: true });

app.get(
  "/sellers",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const sellers = await userController.getSellers();
      res.json(sellers.map((seller) => seller.getAsJson()));
    })
  )
);
export default generic.encapsulateRouter(app, "/users");
