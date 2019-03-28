const config = {
    show : process.env.NIGHTMARE_SHOW
};
if(process.env.NIGHTMARE_DEVTOOLS){
    config.openDevTools = { detach : true }
}
module.exports = config;