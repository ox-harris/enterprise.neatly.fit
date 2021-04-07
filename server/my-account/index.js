
/**
 * 
 * @param Request   request 
 * @param Object    auth 
 * @param Function  next 
 */
export default async function(request, auth, next) {
    if (next.pathname) {
        return next(auth);
    }
    try {
        var user;
        if (!(user = await auth.oauth.handleToken())) {
            user = await auth.oauth.login(['openid', 'profile', 'email'])
        }
    } catch(e) {
        return e;
    }
    return user;
};