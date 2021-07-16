import dotenv from "dotenv";
/* loading .env file */ dotenv.config();

import Server from "./server";
import { json } from "body-parser";
import { encryption, decryption } from './middlewares';
import { PrivateRoutes, PublicRoutes } from './routes';

import "./models";

//registering middlewares
Server.registerMiddleware(json({ limit: "1mb" }));
Server.registerMiddleware(encryption);
Server.registerMiddleware(decryption);

//registering routes
PublicRoutes.forEach(route => Server.registerRoute(route, true));
PrivateRoutes.forEach(route => Server.registerRoute(route, false));

//init
Server.init();
