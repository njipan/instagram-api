const { AccountService } = require('../../shared/services/account');

class AccountController {

    async index(req, res){
        const body = req.queryOnly(['username','email','page','like_per_day']);
        return AccountService.getAll(body,
            (messages, data) => {
                if(messages){
                    return res.jsonError({ messages });
                }
                return res.jsonSuccess({ data });
            });

        const data = await AccountService.getAll({
            conditions,
            page: req.query.page
        });
        return res.jsonSuccess({ data });
    }

    async store(req, res){
        const body = req.only(['username','email','password']);
        return AccountService.store(body, (messages, data) => {
            if(messages) return res.jsonError({ messages });
            return res.jsonSuccess({ data });
        });
    }

    async update(req, res){
        const body = req.only(['username','email','password']);
        await AccountService.update(req.params.id, body, (messages, data) => {
            if(messages) return res.jsonError({ messages });
            return res.jsonSuccess({ data });
        });
    }

    async show(req, res){
        return AccountService.get(req.params.id, (messages, data) => {
            if(messages) return res.jsonError({ messages });
            return res.jsonSuccess({ data });
        });
    }

    async delete(req, res){
        return AccountService.delete(req.params.id, (messages, data) => {
            if(messages) return res.jsonError({ messages });
            return res.jsonSuccess({ data });
        });
    }
}
exports.AccountController = new AccountController();