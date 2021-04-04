
/**
 * 
 * @param Request   request 
 * @param Object    recieved 
 * @param Function  next 
 */
export default async function(request, recieved, next) {
    if (next.pathname) {
        return next(recieved);
    }
    try {
        var authStatus;
        if (authStatus = await recieved.oauth.handleToken()) {
            return authStatus;
        }
        if (authStatus = await recieved.oauth.login(['openid', 'profile', 'email'])) {
            return authStatus;
        }
    } catch(e) {
        return e;
    }
};