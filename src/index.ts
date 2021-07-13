import dotenv from "dotenv";
/* loading .env file */ dotenv.config();

import Server from "./server";
import { json } from "body-parser";
import "./models";

Server.registerMiddleware(
  json({
    limit: "1mb",
  })
);

Server.init();
