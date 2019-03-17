const { ProxyValidator } = require('../../validators/proxy');

const check = async (req, res, next) => {
    let messages = await ProxyValidator.validate(req.body);
    if(messages) return res.jsonError({ messages });

    next();
}

module.exports = {
    check
}