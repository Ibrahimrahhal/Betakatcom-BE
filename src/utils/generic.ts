import { RequestHandler, Router, Request, Response, NextFunction } from "express";
import { HTTP_RESPONSES } from "./constants";

export default class generic {
  private constructor() {}

  public static encapsulateRouter(router: Router, path: string): Router {
    const wrapperRouter = Router({ mergeParams: true });
    wrapperRouter.use(path, router);
    return wrapperRouter;
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

  public static adminOnlyRouteWrapper(handler: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!(req as any).user.isAdmin()) {
        res.sendStatus(HTTP_RESPONSES.UNAUTHORIZED);
        return;
      }
      handler(req, res, next);
    };
  }

  public static sellerOnlyRouteWrapper(handler: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!(req as any).user.isSeller()) {
        res.sendStatus(HTTP_RESPONSES.UNAUTHORIZED);
        return;
      }
      handler(req, res, next);
    };
  }
}
