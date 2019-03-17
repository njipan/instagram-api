const Joi = require('joi');
const JoiMessages = require('../../../shared/helpers/joi-messages');
const {User} = require('../../../shared/models');

const schema = Joi.object().keys({
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(20).optional()
});

const validate = async function(data){
    const {error,value} = Joi.validate(data, schema,{abortEarly: false});
    if(error) return JoiMessages.parse(error.details);
    const messages = {};
    const isEmailExist = await User.find({email: data.email});
    if(isEmailExist.length){
        messages.email = 'email already used';
    }
    if(Object.keys(messages).length === 0) return null;
    return { messages };
}

module.exports = {
    validate: validate
};