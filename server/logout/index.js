
/**
 * 
 * @param Request request 
 * @param Object recieved 
 * @param Function next 
 */
export default async function(request, recieved, next) {
    if (next.pathname) {
        return next(recieved);
    }
    return recieved.oauth.logout(true);
};