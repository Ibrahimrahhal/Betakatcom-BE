import CardType from "./../models/cardType";

export default class CardTypeController {
  private constructor() {}

  public static async create(card: any): Promise<CardType> {
    return await CardType.create(card);
  }
  public static async get(id: number): Promise<CardType | null> {
    return await CardType.findOne({ where: { id: id } });
  }
  public static async getAll(): Promise<CardType[]> {
    return await CardType.findAll();
  }
  public static async update(card: any): Promise<void> {
    await CardType.update(card, { where: { id: card.id } });
  }
}
