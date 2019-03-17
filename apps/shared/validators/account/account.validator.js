const Joi = require('joi');
const JoiMessages = require('@apps/shared/helpers/joi-messages');

const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(20).required()
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