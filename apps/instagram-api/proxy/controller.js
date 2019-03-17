const { ProxyService } = require('@apps/shared/services/proxy');

class ProxyController {
    async index(req, res){
        return ProxyService.getAll(req.queryOnly(['ip', 'port', 'page']), (messages, data) => {
            if(messages){
                return res.jsonError({ messages });
            }
            return res.jsonSuccess({ data });
        });
    }

    async store(req, res){
        const body = req.only(['ip','port','username','password']);
        return ProxyService.store(body, (messages, data) => {
            if(messages){
                return res.jsonError( messages );
            }
            return res.jsonSuccess({data});
        });
    }

    async show(req, res){
        return ProxyService.get(req.params.id, (err, data) => {
            return res.jsonSuccess({data});
        });
    }

    async update(req, res){
        const body = req.only(['ip','port','username','password']);
        console.log(body);
        return ProxyService.update(req.params.id, body, (messages, data) => {
            if(messages){
                return res.jsonError({ messages });
            }
            return res.jsonSuccess({ data });
        });
    }

    async delete(req, res){
        return ProxyService.delete(req.params.id,(messages, data) => {
            return res.jsonSuccess({ data });
        });
    }
}
exports.ProxyController = new ProxyController();