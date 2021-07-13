import { Router, Request, Response } from "express";
import { user } from '../services';
import { HTTP_RESPONSES } from "../utils/constants";

const app = Router();

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userObj = await user.get(username);
  if(!userObj || !user.verifyPass(password, userObj.get('password') as string)) {
        res.sendStatus(HTTP_RESPONSES.BAD_REQUEST);
        return;
  }

  //create jwt and return it
});

export default app;
