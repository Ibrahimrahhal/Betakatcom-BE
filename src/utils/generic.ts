import { Router } from "express";

export default class generic {
  private constructor() {}

  public static encapsulateRouter(router: Router, path: string) {
    const wrapperRouter = Router();
    wrapperRouter.use(path, router);
    return router;
  }
}
