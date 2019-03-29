const {Account, AccountOnline } = require('../../models');
const { BotUserState, SocketType } = require('../../../../shared/enums');
const { socketClient } = require('../../../../shared/socket-client');
class AccountService {
    async changeState(data){
        return new Promise(async resolve => {
            const account = await Account.findOne({ username : data.username });
            if(account == null) resolve(false);
            await AccountOnline.updateOne({'account' : account._id || '' }, {
                account,
                state : data.state,
                updated_at : data.updated_at
            }, { upsert: true, setDefaultsOnInsert: true });
            resolve(true);
        });
    }

    async getAvailableAccounts(type){
        const condition = { };
        if(type === BotUserState.LIKE){
            condition.total_like = { $lt : process.env.MAX_LIKE_PER_DAY };
        }
        else{
            condition.total_comment = { $lt : process.env.MAX_COMMENT_PER_DAY };
        }
        return new Promise(async resolve => {
            const accounts = await AccountOnline.find({
                state : BotUserState.LOGGED_IN
            }).populate({
                path: 'account',
                match : condition
            });
            resolve(accounts);
        });
    }

    async execute(data){
        return new Promise(async resolve => {
            const accounts = await this.getAvailableAccounts(data.type);
            if(accounts.length < data.likes){
                resolve({ status: 'error', message : `${data.likes} is can't be done` });
            }
            const usernames = accounts.map(items => items.account.username);
            const response = {
                usernames,
                link : data.link,
                type : data.type
            };
            if(response.type === BotUserState.LIKE_COMMENT) response.comment_id = data.comment_id || null;
            socketClient.emit(SocketType.BOT_EXECUTE, response);
            resolve({ status: 'success', message : `Executing ..` });
        });
    }
}
module.exports = new AccountService();