
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
    return account.oauth.logout(true);
};