import { Router } from "express";
import { generic } from "../utils";
import TransactionController from "../controllers/transactionController";

const app = Router({ mergeParams: true });

app.post(
  "/pruchase/card/",
  generic.sellingPointOnlyRouteWrapper(
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
  generic.sellerOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { user } = req as any;
      const { user: userToIncreament, amount } = req.body;
      await TransactionController.increaseBallance(user.id, parseInt(userToIncreament), parseFloat(amount));
      res.json({});
    })
  )
);

export default generic.encapsulateRouter(app, "/transaction");
