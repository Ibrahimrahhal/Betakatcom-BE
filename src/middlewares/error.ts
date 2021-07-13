import { Request, Response, NextFunction } from "express";
import { HTTP_RESPONSES } from "../utils/constants";
import { error } from "../utils";

export default function (err: Error, req: Request, res: Response, next: NextFunction): void {
  error.report(err);
  res.status(HTTP_RESPONSES.ERROR).send({ error: "Something failed!" });
}
