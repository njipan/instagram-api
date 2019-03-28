module.exports = (validator) => {
    const check = async (req, res, next) => {
        let messages = await validator.validate(req.body);
        if(messages) return res.jsonError({ messages });

        next();
    };
    return check;
};