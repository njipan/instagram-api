const mongoose = require("../../../shared/mongoose");

const AccountOnlineSchema = mongoose.Schema({
    state : { type: String },
    account : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    },
    updated_at : { type : Date , 'default' : Date.now() }
});

module.exports = mongoose.model("AccountOnline", AccountOnlineSchema, 'online_accounts');
