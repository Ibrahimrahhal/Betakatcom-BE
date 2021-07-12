import { Request, Response, NextFunction } from "express";
import TokensController from "../controllers/tokensController";
import { HTTP_RESPONSES } from "../utils//constants";

export default function (req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.get("Authorization");
  if (TokensController.verify(authHeader || "")) {
    next();
  } else {
    res.sendStatus(HTTP_RESPONSES.BAD_REQUEST);
  }
}
