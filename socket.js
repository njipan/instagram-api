const { SocketType } = require('./shared/enums');
const { AccountOnlineService } = require('./apps/shared/services/account-online');
var socketIO, BOT = {};
const serve = (io) => {
    socketIO = io;
    io.on('connection', (socket) => {
        socket.on(SocketType.BOT_USER_STATE, BOT.onUserStateChange);
        socket.on(SocketType.BOT_EXECUTE, BOT.onBotExecute);
    });
};
BOT.onUserStateChange = async (data) => {
    await AccountOnlineService.changeState({
        username : data.username,
        state : data.state,
        updated_at : data.updated_at
    });
    socketIO.emit(SocketType.BOT_LIST_USER, true);
};
BOT.onBotExecute = async (data) => {
    socketIO.emit(SocketType.BOT_EXECUTE, data);
};
module.exports = serve;