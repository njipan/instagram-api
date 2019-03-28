const mongoose = require("../../../shared/mongoose");

const HistorySchema = mongoose.Schema({
    type : String,
    action : String,
    created_at : { type : Date , 'default' : Date.now() }
});

module.exports = mongoose.model("History", HistorySchema, 'histories');
