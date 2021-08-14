import Wallet from '../models/wallet';


export default class WalletController {
    private constructor() {}
    public static async create(intialBalance: number = 0): Promise<Wallet> {
        return await Wallet.create({balance: intialBalance});
    }
  }
  