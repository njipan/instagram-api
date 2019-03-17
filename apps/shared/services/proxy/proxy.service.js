const { Proxy } = require('../../models');

class ProxyService {

    async getAll(data, cb){
        const conditions = {};
        if(data.ip) conditions.ip = new RegExp(data.ip,'i');
        if(data.port) conditions.port = new RegExp(data.port,'i');

        const proxies = await Proxy.paginate({
            conditions,
            page: data.page
        });
        return cb(null, proxies);
    }

    async get(id, cb){
        const proxy = await Proxy.findById(id);
        return cb(null, proxy);
    }

    async store(data, cb){
        const messages = {};
        const checkIP = await Proxy.findOne({ip: data.ip});
        if(checkIP) messages.ip = 'IP already used';
        if(Object.keys(messages).length) return cb(messages, null);

        const proxy = new Proxy(  {
            ip: data.ip,
            port: data.port,
            username: data.username,
            password: data.password
        });
        await proxy.save();
        return cb(null, proxy);
    }

    async update(id, data, cb){
        console.log(id);
        const proxy = await Proxy.findById(id);
        const messages = {};
        if(proxy != null && proxy.ip != data.ip){
            const check = await Proxy.findOne({ip: data.ip});
            if(check) messages.ip = 'IP already used';
        }
        if(Object.keys(messages).length) return cb(messages, null);
        const updatedProxy = await Proxy.findOneAndUpdate({_id:id},{$set: data}, {new:true}).select('-username -password');
        return cb(null, updatedProxy);
    }

    async delete(id, cb){
        const proxy = await Proxy.findOneAndDelete({_id: id}).select('-username -password');
        return cb(null, proxy);
    }

}
module.exports = new ProxyService();