const { Account, Proxy } = require('../../models');
const { exec } = require("child_process");
const configs = require('../../../bot/configs');

class BotService {
    async login(data, cb){
        const accounts = await Account.find({
            _id : { $in : data.accounts }
        }).select('+password');
        if(accounts.length < 1) return cb('empty accounts', true);
        let proxy = null;
        let proxy_host = '', credentials = '';
        if(typeof data.proxy !== 'undefined')
            proxy = await Proxy.findById(data.proxy || '');
        if(proxy != null){
            proxy_host = `${(proxy.ip || '')}:${(proxy.port || '')}`.trim();
            credentials = `${proxy.username || ''} ${proxy.password || ''}`.trim();
        }
        let command = `start cmd.exe /K node ${configs.execute.LOGIN}`;
        let response = {};
        let isFailed = false;
        accounts.map(account => {
            isFailed = false;
            let command_exec = `${command} ${account.username} ${account.password} ${proxy_host} ${credentials}`;
            exec(command_exec, (err, stdout, stderr) => {
                isFailed = true;
            });
            if(isFailed) response[account.username] = 'execute failed';
            else response[account.username] = 'execute succeed';
        });
        return cb(response, false);
    }
}
module.exports = new BotService();