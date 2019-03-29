const { AccountOnlineService } = require('../../../shared/services/account-online');
const { BotUserState } = require('../../../../shared/enums');
class BotController {
    async like(req, res){
        const data = req.only(['link', 'likes']);
        data.type = BotUserState.LIKE;
        const result = await AccountOnlineService.execute(data);
        if(result.status === 'error') return res.jsonError({message : result.message})
        return res.jsonSuccess({ message : result.message });
    }

    async likeComment(req, res){
        const data = req.only(['link', 'comment_id', 'likes']);
        data.type = BotUserState.LIKE_COMMENT;
        const result = await AccountOnlineService.execute(data);
        if(result.status === 'error') return res.jsonError({message : result.message})
        return res.jsonSuccess({ message : result.message });
    }

    async login(req, res){
        const data = req.only(['account', 'proxy']);
        return res.jsonSuccess(data);
    }
}
module.exports = new BotController();