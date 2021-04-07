
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
    return auth.oauth.logout(true);
};