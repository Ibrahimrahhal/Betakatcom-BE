import dotenv from "dotenv";
/* loading .env file */ dotenv.config();

import Server from "./server";
import "./models";

Server.init();
