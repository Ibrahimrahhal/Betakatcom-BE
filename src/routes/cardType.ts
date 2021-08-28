import { Router } from "express";
import { generic } from "../utils";
import CardTypeController from "../controllers/cardTypeController";
import UserType from "../models/userType";
const app = Router({ mergeParams: true });

app.get(
  "/",
  generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
    const cards = await CardTypeController.getAll();
    res.json(cards);
  })
);

app.post(
  "/",
  generic.roleBasedRouteWrapper(
    UserType.adminId,
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { nameArabic, nameEnglish, image, price, type } = req.body;
      const cardType = await CardTypeController.create({
        nameArabic,
        nameEnglish,
        image,
        price,
        type,
      });
      res.json(cardType.toJSON());
    })
  )
);

app.put(
  "/",
  generic.roleBasedRouteWrapper(
    UserType.adminId,
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const card = req.body;
      await CardTypeController.update(card);
      res.json({});
    })
  )
);

export default generic.encapsulateRouter(app, "/card-type");
