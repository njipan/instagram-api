const { AccountValidator } = require('../../validators/account');

const check = async (req, res, next) => {
    let messages = await AccountValidator.validate(req.body);
    if(messages) return res.jsonError({ messages });

    next();
}

module.exports = {
    check
}