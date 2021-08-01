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

app.put(
  "/seller",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const seller = req.body;
      await userController.update(seller);
      res.json({});
    })
  )
);

app.post(
  "/seller",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const seller = req.body;
      const user = await userController.create(seller);
      res.json(user.getAsJson());
    })
  )
);
export default generic.encapsulateRouter(app, "/users");
