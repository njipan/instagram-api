const Joi = require('joi');
const JoiMessages = require('../../helpers/joi-messages');

const schema = Joi.object().keys({
    ip: Joi.string().ip().required(),
    port: Joi.number().integer().positive().optional(),
    username: Joi.string().min(3).max(20).optional(),
    password: Joi.string().min(6).max(20).optional(),
});

const validate = async function(data){
    return Joi.validate(data, schema,{abortEarly: false}, (err, data) => {
        if(err) return JoiMessages.parse(err.details);
        return null;
    });
}

module.exports = {
    validate: validate
};