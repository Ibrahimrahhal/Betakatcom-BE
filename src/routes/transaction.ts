import { Router } from "express";
import { generic } from "../utils";
import TransactionController from "../controllers/transactionController";
import UserType from "../models/userType";

const app = Router({ mergeParams: true });

app.post(
  "/pruchase/card/",
  generic.roleBasedRouteWrapper(
    UserType.sellingPointId,
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { user } = req as any;
      const { type } = req.body;
      await TransactionController.purchaseCard(user.id, parseInt(type), user.wallet);
      res.json({});
    })
  )
);

app.post(
  "/pruchase/credit",
  generic.roleBasedRouteWrapper(
    UserType.sellerId,
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { user } = req as any;
      const { user: userToIncreament, amount } = req.body;
      await TransactionController.increaseBallance(
        user.id,
        user.wallet,
        parseInt(userToIncreament),
        parseFloat(amount)
      );
      res.json({});
    })
  )
);

app.post(
  "/ballance/pay",
  generic.roleBasedRouteWrapper(
    UserType.adminId,
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { user } = req as any;
      const { user: userToIncreament, amount } = req.body;
      await TransactionController.payBallance(user.id, userToIncreament.id, parseFloat(amount));
      res.json({});
    })
  )
);

export default generic.encapsulateRouter(app, "/transaction");
