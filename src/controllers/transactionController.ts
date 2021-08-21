import { Transaction as DbTransaction, where, col } from "sequelize";
import Card from "../models/card";
import Transaction from "../models/transaction";
import TranscationType from "../models/transactionType";
import connection from "../models/connection";
import WalletController from "./WalletController";
import UserController from "./userController";
import CardTypeController from "./cardTypeController";

export default class TransactionController {
  private constructor() {}

  public static purchaseCard(userId: number, cardType: number, walletId: number): Promise<Card> {
    return connection.transaction(async (t: DbTransaction) => {
      const _cardType = await CardTypeController.get(cardType);
      if (!_cardType) throw new Error("Unknown Card Type");
      const cards = await Card.findAll({
        include: [
          {
            model: Transaction,
            required: false,
          },
        ],
        where: where(col("Transaction.card"), "IS", null),
        limit: 1,
        transaction: t,
      });
      if (cards.length === 0) throw new Error("No Cards Found");
      const selectedCard = cards[0];
      await Transaction.create({
        type: TranscationType.cardPurchase,
        amount: -1 * (_cardType.get("price") as number),
        card: selectedCard.get("id"),
        createdBy: userId,
        userEffected: userId,
        transaction: t,
      });
      await WalletController.decrement(walletId, selectedCard.get("price") as number, t);
      return selectedCard;
    });
  }

  public static increaseBallance(
    userId: number,
    userWalletId: number,
    userIdToIncrease: number,
    amount: number
  ): Promise<void> {
    return connection.transaction(async (t: DbTransaction) => {
      const userToIncreament = await UserController.getById(userIdToIncrease, t);
      if (!userToIncreament) throw new Error("User Not Found");
      await Transaction.create({
        type: TranscationType.creditPurchase,
        amount: amount,
        createdBy: userId,
        userEffected: userIdToIncrease,
        transaction: t,
      });
      await Transaction.create({
        type: TranscationType.creditSelling,
        amount: amount,
        createdBy: userId,
        userEffected: userId,
        transaction: t,
      });
      await WalletController.increment(userToIncreament.get("wallet") as number, amount, t);
      await WalletController.increment(userWalletId, amount, t);
    });
  }

  public static payBallance(userId: number, PayingUserId: number, amount: number): Promise<void> {
    return connection.transaction(async (t: DbTransaction) => {
      const userToIncreament = await UserController.getById(PayingUserId, t);
      if (!userToIncreament) throw new Error("User Not Found");
      await Transaction.create({
        type: TranscationType.ballancePay,
        amount: -1 * amount,
        createdBy: userId,
        userEffected: PayingUserId,
        transaction: t,
      });
      await WalletController.decrement(PayingUserId, amount, t);
    });
  }
}
