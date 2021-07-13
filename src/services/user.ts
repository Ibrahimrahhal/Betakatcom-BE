import { User as UserModel } from '../models/';
import { crypto } from '../utils';

export default class user {
    private constructor() { }

    public static get(username: string) {
        return UserModel.findOne({ where: { username }});
    }

    public static verifyPass(input: string, saved: string): boolean {
        if(crypto.hash(input) === saved) {
            return true;
        }
        return false
    }
}