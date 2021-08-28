import { Transaction as DbTransaction, where, col, and } from "sequelize";
import Card from "../models/card";
import Transaction from "../models/transaction";
import TranscationType from "../models/transactionType";
import connection from "../models/connection";
import WalletController from "./WalletController";
import UserController from "./userController";
import CardTypeController from "./cardTypeController";
import UserType from "../models/userType";

export default class TransactionController {
  private constructor() {}

  public static purchaseCard(userId: number, cardType: number, walletId: number): Promise<Card> {
    return connection.transaction(async (t: DbTransaction) => {
      const _cardType = await CardTypeController.get(cardType);
      if (!_cardType) throw new Error("[RETURN] Unknown Card Type");
      if (!_cardType.get("price")) throw new Error("[RETURN] Only Leaf Card Types Allowed");

      const cards = await Card.findAll({
        include: [{ model: Transaction }],
        where: and(where(col("Transaction.card"), "IS", null), where(col("Card.type"), cardType as any)),
        limit: 1,
        transaction: t,
      });
      if (cards.length === 0) throw new Error("[RETURN] No Cards Found");
      const selectedCard = cards[0];
      await Transaction.create(
        {
          type: TranscationType.cardPurchase,
          amount: -1 * (_cardType.get("price") as number),
          card: selectedCard.get("id"),
          createdBy: userId,
          userEffected: userId,
        },
        {
          transaction: t,
        }
      );
      try {
        await WalletController.decrement(walletId, _cardType.get("price") as number, t);
      } catch (e) {
        throw new Error("[RETURN] No Enough Ballance In Wallet!");
      }
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
      if (amount < 0) throw new Error("[RETURN] Negative Amount Not Allowed");
      const userToIncreament = await UserController.getById(userIdToIncrease, t);
      if (!userToIncreament) throw new Error("[RETURN] User Not Found");
      console.log(userToIncreament.get("type"), UserType.sellingPointId);
      if (userToIncreament.get("type") !== UserType.sellingPointId)
        throw new Error("[RETURN] Only Selling Points Users Allowed");
      await Transaction.create(
        {
          type: TranscationType.creditPurchase,
          amount: amount,
          createdBy: userId,
          userEffected: userIdToIncrease,
        },
        {
          transaction: t,
        }
      );
      await Transaction.create(
        {
          type: TranscationType.creditSelling,
          amount: amount,
          createdBy: userId,
          userEffected: userId,
        },
        {
          transaction: t,
        }
      );
      await WalletController.increment(userToIncreament.get("wallet") as number, amount, t);
      await WalletController.increment(userWalletId, amount, t);
    });
  }

  public static payBallance(userId: number, PayingUserId: number, amount: number): Promise<void> {
    return connection.transaction(async (t: DbTransaction) => {
      const userToIncreament = await UserController.getById(PayingUserId, t);
      if (!userToIncreament) throw new Error("[RETURN] User Not Found");
      if (amount < 0) throw new Error("[RETURN] Negative Amount Not Allowed");
      await Transaction.create(
        {
          type: TranscationType.ballancePay,
          amount: -1 * amount,
          createdBy: userId,
          userEffected: PayingUserId,
        },
        {
          transaction: t,
        }
      );
      try {
        await WalletController.decrement(userToIncreament.get("wallet") as number, amount, t);
      } catch (e: any) {
        if (e.toString().includes("Out of range value")) {
          throw new Error("[RETURN] Given Amount Is Bigger Than Ballance!");
        } else {
          throw new Error(e.toString());
        }
      }
    });
  }
}
