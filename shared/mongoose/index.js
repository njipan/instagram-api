const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true`;
// const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Successfully connected to mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`);
},err => {
    console.log(err);
});

const paginate = (schema, options) => {
    schema.statics.paginate = async function(options){
        const opts = {
            conditions: options.conditions,
            page: (parseInt(options.page) < 1) ? 1 : parseInt(options.page),
            perPage: options.perPage || this.perPage || parseInt(process.env.PAGINATE_PER_PAGE),
            sort: options.sort || undefined
        };
        const result = await this.find(opts.conditions)
            .skip((opts.page - 1) * opts.perPage)
            .limit(opts.perPage)
            .sort(opts.sort);
        const total = await this.countDocuments({});
        return {
            items : result,
            lastPage: Math.ceil(total/opts.perPage)
        };
    }
}

mongoose.plugin(paginate);

module.exports = mongoose;
