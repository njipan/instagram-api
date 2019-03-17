const sanitize = require('mongo-sanitize');
const filter = (data, keys) => {
    const obj = {};
    for (let key in keys) {
        if (typeof data[keys[key]] == "undefined") continue;
        obj[keys[key]] = sanitize(data[keys[key]]);
    }
    return obj;
}

exports.requestOnly = () => {
    return (req, res, next) => {
        req.only = (keys) => {
            return filter(req.body, keys);
        }
        req.queryOnly = (keys) => {
            return filter(req.query, keys);
        }
        next();
    }
}
