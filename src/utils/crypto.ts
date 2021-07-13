import AES from "crypto-js/aes";
import { config } from "../utils";

export default class crypto {
  private constructor() {}

  public static symmetricEncrypt(message: string | Object): string {
    if (typeof message !== typeof {}) message = { data: message };
    return AES.encrypt(JSON.stringify(message), this.symmetricKey).toString();
  }

  public static symmetricDecrypt(message: string) {
    return JSON.parse(AES.decrypt(message, this.symmetricKey).toString());
  }

  private static get symmetricKey(): string {
    return config.get("JWT_SECRET");
  }
}
