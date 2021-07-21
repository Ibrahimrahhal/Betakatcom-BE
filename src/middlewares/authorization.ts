import { Request, Response, NextFunction } from "express";
import TokensController from "../controllers/tokensController";
import { User } from "../models";
import { HTTP_RESPONSES } from "../utils/constants";

export default function (req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.get("Authorization");
  if (TokensController.verify(authHeader || "")) {
    (req as any)["user"] = new User(TokensController.decode(authHeader || ""));
    next();
  } else {
    res.sendStatus(HTTP_RESPONSES.UNAUTHORIZED);
  }
}
