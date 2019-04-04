const mongoose = require("mongoose");
const env = process.env;
const uri = `mongodb+srv://${env.MONGODB_USERNAME}:${env.MONGODB_password}@${env.MONGODB_HOST}/${env.MONGODB_DATABASE}`;
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Successfully connected to ${env.MONGODB_HOST}`);
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
            result : result,
            lastPage: Math.ceil(total/opts.perPage)
        };
    }
};

mongoose.plugin(paginate);

module.exports = mongoose;
