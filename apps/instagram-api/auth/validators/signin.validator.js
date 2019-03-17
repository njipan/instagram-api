const Joi = require('joi');
const JoiMessages = require('../../../shared/helpers/joi-messages');
const {User} = require('../../../shared/models');

const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required()
});

const validate = async function(data){
    const {error,value} = Joi.validate(data, schema,{abortEarly: false});
    if(error) return JoiMessages.parse(error.details);
    const messages = {};
    const isUsernameExist = await User.find({username: data.username});
    if(!isUsernameExist.length){
        messages.username = 'username does not exist';
    }
    if(Object.keys(messages).length === 0) return null;
    return { messages };
}

module.exports = {
    validate: validate
};