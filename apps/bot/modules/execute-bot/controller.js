const { AccountOnlineService } = require('../../../shared/services/account-online');
class BotController {
    async like(req, res){
        const data = req.only(['type', 'link', 'likes']);
        const result = await AccountOnlineService.execute(data);
        if(result.status === 'error') return res.jsonError({message : result.message})
        return res.jsonSuccess({ message : result.message });
    }
}
module.exports = new BotController();