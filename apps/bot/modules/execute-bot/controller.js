const { AccountOnlineService } = require('../../../shared/services/account-online');
const { BotService } = require('../../../shared/services/bot');
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
        const data = req.only(['accounts', 'proxy']);
        return BotService.login(data, (data, err) => {
            if(err){
                return res.jsonError({ message : data });
            }
            return res.jsonSuccess({ messages : data});
        });
    }
}
module.exports = new BotController();