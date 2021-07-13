import jwt from "jsonwebtoken";
import { config, crypto } from "../utils/index";

export default class TokensController {
  private constructor() {}

  public static verify(BaearerToken: string): boolean {
    try {
        const token = this.getTokenFromBearerToken(BaearerToken || "");
        const decryptedToken = crypto.symmetricDecrypt(token);
        jwt.verify(decryptedToken, this.jwtSecret);
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

  private static get jwtSecret(): string {
      return config.get("JWT_SECRET");
  }
}
