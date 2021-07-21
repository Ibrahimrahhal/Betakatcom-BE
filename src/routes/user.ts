import { Router } from "express";
import { generic } from "../utils";

const app = Router({ mergeParams: true });

app.get("/", (req, res) => {
  res.json((req as any).user);
});

app.post("/", (req, res) => {
  res.json((req as any).user);
});

export default generic.encapsulateRouter(app, "/user");
