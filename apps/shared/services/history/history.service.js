const { History } = require('../../models');
class HistoryService {

    async save(data){
        return new Promise(async resolve => {
            const history = new History(data);
            await history.save(data);
            resolve(true);
        });
    }

}
module.exports = new HistoryService();