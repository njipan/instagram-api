const Nightmare = require('nightmare');
Nightmare.action(
    'onBeforeSendHeaders',
    function(name, options, parent, win, renderer, done) {
        win.webContents.session.webRequest.onBeforeSendHeaders((details, cb) => {
            parent.call('onBeforeSendHeaders', details, res => {
                res ? cb(Object.assign({}, res)) : cb({ cancel: false })
            })
        });
        done()
    },
    function(handler, done) {
        this.child.respondTo('onBeforeSendHeaders', handler);
        done()
    }
);

module.exports = Nightmare;