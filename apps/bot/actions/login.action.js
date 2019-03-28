const { socketClient } = require('../shared/socket-client');
const { SocketType, BotUserState } = require('../../../shared/enums');
const { HistoryService } = require('../../shared/services/history');
const { HistoryType } = require('../../../shared/enums');
module.exports = {
  process: (nightmare, account)=> {
      return new Promise((resolve, reject) => {
          nightmare
              .goto(process.env.BASE_URL)
              .wait()
              .goto(`${process.env.BASE_URL}${process.env.LOGIN_URL}`)
              .wait("[name=username]")
              .wait(500)
              .type("[name=username]", account.username)
              .type("[name=password]", account.password)
              .click("button[type=submit]")
              .wait(5000)
              .exists("[name=username]")
              .then((result) => {
                  if(!result){
                      socketClient.emit(SocketType.BOT_USER_STATE, {
                          username : account.username,
                          state :  BotUserState.LOGGED_IN,
                          updated_at : new Date()
                      });
                      resolve(nightmare);
                  }
                  else {
                      HistoryService.save({
                          type : HistoryType.LOGGED_IN,
                          action : `${account.username} can't logged in`
                      });
                      socketClient.emit(SocketType.BOT_USER_STATE, {
                          username : account.username,
                          state :  BotUserState.FAILED_LOGGED_IN,
                          updated_at : new Date()
                      });
                      resolve(null);
                  }
                  return false;
              });
      });
  }
};
