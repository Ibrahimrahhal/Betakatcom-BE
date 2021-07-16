import { Request, Response, NextFunction } from "express";
import { crypto, config } from "../utils";

export default function (req: Request, res: Response, next: NextFunction): void {
  if (config.get("ENABLE_ENCRYPTION") === "TRUE") {
    const oldSend = res.json;
    res.json = function (data) {
      const ecryptedData = crypto.symmetricEncrypt(data);
      res.json = oldSend;
      return res.json({ data: ecryptedData });
    };
  }
  next();
}
