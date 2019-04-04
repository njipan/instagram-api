const random = require('random');
const { socketClient } = require('../shared/socket-client');
const { SocketType, BotUserState } = require('../../../shared/enums');
const { Post } = require('../api');
const { HistoryType } = require('../../../shared/enums');
const delay = require('../../shared/helpers/delay');
let isProcessing = false;
const actions = [];
module.exports = {
    process: (nightmare, username)=> {
        return new Promise(async (resolve, reject) => {
            socketClient.on(SocketType.BOT_EXECUTE, async (data) => {
                actions.push(data);
                if(isProcessing) return;

                isProcessing = true;
                let i = 0;
                while(actions.length > 0){
                    await delay(random.int(5000, 10000));
                    const dataToProcess = actions.shift();
                    const post = await Post.getPostByUrl(dataToProcess.link);
                    if(typeof post.data.graphql.shortcode_media == 'undefined'){
                        socketClient.emit(SocketType.HISTORY_SAVE, {
                            type : HistoryType.VISITED_POST,
                            action : `${dataToProcess.link} not found`
                        });
                        return;
                    }
                    const postPayload = post.data.graphql.shortcode_media;
                    await goToLink(nightmare, postPayload);
                    if(dataToProcess.type === BotUserState.LIKE) await like(nightmare, postPayload.id);
                    else if(dataToProcess.type === BotUserState.LIKE_COMMENT) await likeComment(nightmare, dataToProcess.comment_id);
                }
                isProcessing = false;
            });
        });
    }
};

const goToLink = (nightmare, post) => {
    const postLink = `/p/${post.shortcode}/`;
    return new Promise((resolve) => {
        nightmare
            .goto(`${process.env.BASE_URL}${postLink}`)
            .wait(random.int(500,2000))
            .then(() => resolve(true));
        });
};

const like = (nightmare, postId) => {
    const link = `${process.env.BASE_URL}/web/likes/${postId}/like/`;
    return new Promise(resolve => {
        nightmare.cookies.get('csrftoken').then(result => {
            nightmare.evaluate((csrftoken, paramLink, headers) => {
                fetch(paramLink, {
                    credentials: 'include',
                    method: 'post',
                    headers: Object.assign(headers, {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrftoken,
                    })
                });
            }, result.value, link, nightmare.customHeaders).then(() => {
                socketClient.emit(SocketType.HISTORY_SAVE, {
                    type : HistoryType.LIKE_POST,
                    action : `Post ${postId} liked`
                });
                resolve(true);
            }).catch(() => resolve(false));
        });
    });
};

const likeComment = (nightmare, commentId) => {
    const link = `${process.env.BASE_URL}/web/comments/like/${commentId}/`;
    return new Promise(resolve => {
        nightmare.cookies.get('csrftoken').then(result => {
            nightmare.evaluate((csrftoken, paramLink, headers) => {
                console.log(paramLink);
                fetch(paramLink, {
                    credentials: 'include',
                    method: 'post',
                    headers: Object.assign(headers, {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrftoken,
                    })
                });
            }, result.value, link, nightmare.customHeaders).then(() => {
                socketClient.emit(SocketType.HISTORY_SAVE, {
                    type : HistoryType.LIKE_POST,
                    action : `Comment ${commentId} liked`
                });
                resolve(true);
            }).catch(() => resolve(false));
        });
    });
};