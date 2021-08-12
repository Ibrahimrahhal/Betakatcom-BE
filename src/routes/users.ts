import { Router } from "express";
import { generic } from "../utils";
import { userController } from "../controllers";
import { UserType } from "../models";
import { HTTP_RESPONSES } from "../utils/constants";
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
      const user = await userController.create(seller, UserType.sellerId);
      res.json(user.getAsJson());
    })
  )
);

app.delete(
  "/seller",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { id } = req.query;
      if (!id) {
        res.sendStatus(HTTP_RESPONSES.BAD_REQUEST);
        return;
      }
      await userController.delete(id as string);
      res.json({});
    })
  )
);



app.get(
  "/selling-points",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const sellingPoints = await userController.getSellingPoints();
      res.json(sellingPoints.map((sellingPoint) => sellingPoint.getAsJson()));
    })
  )
);


app.put(
  "/selling-point",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const sellingPoint = req.body;
      await userController.update(sellingPoint);
      res.json({});
    })
  )
);

app.post(
  "/selling-point",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const sellingPoint = req.body;
      const user = await userController.create(sellingPoint, UserType.sellerId);
      res.json(user.getAsJson());
    })
  )
);

app.delete(
  "/selling-point",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { id } = req.query;
      if (!id) {
        res.sendStatus(HTTP_RESPONSES.BAD_REQUEST);
        return;
      }
      await userController.delete(id as string);
      res.json({});
    })
  )
);




export default generic.encapsulateRouter(app, "/users");
