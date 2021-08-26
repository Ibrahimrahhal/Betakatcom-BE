import Card from "../models/card";

export default class WalletController {
  private constructor() {}
  public static async create(code: string, type: number): Promise<Card> {
    return await Card.create({id: 1, code, type });
  }
}
