import express, { Application, Request, Response, NextFunction, Router, RequestHandler } from "express";
import { config } from './utils';
import { auth } from './middlewares';

export default class server {
  private static routers: {private: Router[], public: Router[]} = { private: [] , public: []};
  private constructor() {}

  public static registerRoute(router: Router, isPublic = false) {
    this.routers[isPublic ? 'public' : 'private'].push(router);
  }

  public static init() {
    const port = config.get("PORT");
    const app: Application = express();
    //public routers
    this.attachRoutes(app, this.routers.public);
    //securlty middleware
    this.attachRoutes(app, [auth]);
    //private routers
    this.attachRoutes(app, this.routers.private);

    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  }

  private static attachRoutes(app: Application, routers: Router[] | RequestHandler[]) {
    routers.forEach(router => app.use(router));
  }
}
