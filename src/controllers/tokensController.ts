import jwt from "jsonwebtoken";
import { config } from "../utils/index";

export default class TokensController {
  private constructor() {}

  public static verify(BaearerToken: string): boolean {
    const jwtSecret = config.get("JWT_SECRET");
    const token = this.getTokenFromBearerToken(BaearerToken || "");
    try {
      jwt.verify(token, jwtSecret);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static getTokenFromBearerToken(token: string): string {
    const tokenParts = (token || "").split("Bearer ");
    return (tokenParts && tokenParts[1]) || "";
  }

  private static encryptToken(token: string): string {
    return "";
  }
}
