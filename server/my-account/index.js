
/**
 * 
 * @param Request   request 
 * @param Object    account 
 * @param Function  next 
 */
export default async function(request, account, next) {
    if (next.pathname) {
        return next(account);
    }
    try {
        var authStatus;
        if (!(authStatus = await account.oauth.handleToken())) {
            authStatus = await account.oauth.login(['openid', 'profile', 'email'])
        }
    } catch(e) {
        return e;
    }
    return authStatus;
};