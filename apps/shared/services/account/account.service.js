const { Account } = require('@apps/shared/models');
class AccountService {

    async getAll(data, cb){
        const conditions = {};
        if(data.username) conditions.username = new RegExp(data.username,'i');
        if(data.email) conditions.email = new RegExp(data.email,'i');

        const account = await Account.paginate({
            conditions,
            page: data.page
        });
        return cb(null, account);
    }

    async get(id, cb){
        const proxy = await Account.findById(id);
        return cb(null, proxy);
    }

    async store(data, cb){
        const messages = {};
        const checkUsername = await Account.findOne({ username: data.username });
        if(checkUsername) messages.username = 'username already used';
        const checkEmail = await Account.findOne({ email: data.email });
        if(checkEmail) messages.email = 'email already used';
        if(Object.keys(messages).length){
            return cb(messages, null);
        }

        const account = new Account({
            username : data.username,
            email : data.email,
            password : data.password
        });
        await account.save();
        return cb(null, account);
    }

    async update(id, data, cb){
        const account = await Account.findById(id);
        const messages = {};
        if(data.username != account.username){
            let check = await Account.findOne({username : data.username});
            if(check) messages.username = 'username already used';
        }
        if(data.email != account.email){
            let check = await Account.findOne({email : data.email});
            if(check) messages.email = 'email already used';
        }
        if(Object.keys(messages).length)return cb(messages, null);
        const updatedAccount = await Account.findOneAndUpdate({_id: id},{ $set: data }, {new : true});
        return cb(null, updatedAccount);
    }

    async delete(id, cb){
        const account = await Account.findOneAndDelete({_id: id});
        return cb(null, account);
    }

}
module.exports = new AccountService();