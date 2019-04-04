const { SocketType } = require('./shared/enums');
const { AccountOnlineService } = require('./apps/shared/services/account-online');
const { HistoryService } = require('./apps/shared/services/history');
const { HistoryType } = require('./shared/enums');
var socketIO, BOT = {};
const serve = (io) => {
    socketIO = io;
    io.on('connection', (socket) => {
        socket.on(SocketType.BOT_USER_STATE, BOT.onUserStateChange);
        socket.on(SocketType.BOT_EXECUTE, BOT.onBotExecute);
        socket.on(SocketType.HISTORY_SAVE, BOT.onHistoryComing);
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
BOT.onHistoryComing = async (data) => {
    HistoryService.save(data);
};
module.exports = serve;