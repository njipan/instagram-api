/**
 * @username username account
 * @password password account
 * @proxy_server proxy server host and port
 * @proxy_username proxy username
 * @proxy_password proxy password
 **/
require('dotenv').load();
const { socketClient } = require('../../../shared/socket-client');
const { loginAction, proxyAction, listenAction } = require('../actions');
const { BotUserState, SocketType } = require('../../../shared/enums/');

const args  = process.argv.slice(2);
const username = args[0];
const password = args[1];
const proxy_server = args[2];
const proxy_username = args[3];
const proxy_password = args[4];

const Nightmare = require('../shared/nightmare');
const config = require('../configs');
if(typeof proxy_server != 'undefined'){
    console.log(`USING PROXY ${proxy_server}`);
    config.nightmare.switches = { 'proxy-server': proxy_server };
    console.log(config);
}
let nightmare = Nightmare(config.nightmare);
nightmare.customHeaders = {};
nightmare.onBeforeSendHeaders((details, cb) => {
    for(let idx in config.headers.items){
        let headerName = config.headers.items[idx];
        if(typeof details.headers[headerName] != 'undefined'){
            nightmare.customHeaders[headerName] = details.headers[headerName];
        }
    }
    cb({ cancel: false });
});
nightmare.on('console', (log, msg) => {
    console.log(msg)
});
const start = async () => {
    socketClient.emit(SocketType.BOT_USER_STATE, {
        username,
        state : BotUserState.CONNECTED,
        time : new Date()
    });
    await proxyAction.process(nightmare, {proxy_server, proxy_username, proxy_password});
    const account = {
        username,
        password,
        proxy : { proxy_server, proxy_username, proxy_password }
    };
    await loginAction.process(nightmare, account);
    await listenAction.process(nightmare);
};
start();

const disconnectHandler = () => {
    setTimeout(() => {
        nightmare.end();
        socketClient.emit(SocketType.BOT_USER_STATE, {
            username,
            state : BotUserState.DISCONNECTED,
            time : new Date()
        });
        process.exit(0);
    }, 1000);
};
process.on('SIGINT', disconnectHandler);
process.on('exit', disconnectHandler);




