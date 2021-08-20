import { Router } from "express";
import { generic } from "../utils";
import CardTypeController from "../controllers/cardTypeController";
const app = Router({ mergeParams: true });

app.post(
  "/",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const { nameArabic, nameEnglish, image, price, parent } = req.body;
      const cardType = await CardTypeController.create({
        nameArabic,
        nameEnglish,
        image,
        price,
        parent,
      });
      res.json(cardType.toJSON());
    })
  )
);

app.put(
  "/",
  generic.adminOnlyRouteWrapper(
    generic.asyncRouteErrorHandlerWrapper(async (req, res) => {
      const card = req.body;
      await CardTypeController.update(card);
      res.json({});
    })
  )
);

export default generic.encapsulateRouter(app, "/card-type");
