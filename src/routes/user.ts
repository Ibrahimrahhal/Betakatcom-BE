import { Router } from "express";
import { generic } from "../utils";

const app = Router();

export default generic.encapsulateRouter(app, "/user");
