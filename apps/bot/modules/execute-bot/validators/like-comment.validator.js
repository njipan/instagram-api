const Joi = require('joi');
const JoiMessages = require('../../../../shared/helpers/joi-messages');

const schema = Joi.object().keys({
    link: Joi.string().required(),
    comment_id : Joi.string().required(),
    likes : Joi.number().min(1).positive().required()
});

const validate = async function(data){
    return Joi.validate(data, schema,{abortEarly: false}, (err, data) => {
        if(err) return JoiMessages.parse(err.details);
        return null;
    });
};

module.exports = {
    validate: validate
};