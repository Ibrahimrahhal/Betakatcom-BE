import { RequestHandler, Router, Request, Response, NextFunction } from "express";

export default class generic {
  private constructor() {}

  public static encapsulateRouter(router: Router, path: string): Router {
    const wrapperRouter = Router();
    wrapperRouter.use(path, router);
    return router;
  }

  public static asyncRouteErrorHandlerWrapper(handler: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const returned: any = handler(req, res, next);
      if (returned instanceof Promise) {
        returned.catch((err) => {
          next(err);
        });
      }
    };
  }
}
