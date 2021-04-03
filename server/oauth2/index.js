
/**
 * 
 * @param Object process 
 * @param Object recieved 
 * @param Function next 
 */
export default async function(process, recieved, next) {

    var authStatus;
    try {
        if (authStatus = await recieved.oauth.finishAuthenticationFlow()) {
            console.log('>>---------------------1111111', authStatus);
            return authStatus;
        }
    } catch(e) {
        return e;
    }
    if (authStatus = await recieved.oauth.requireAuthentication()) {
        console.log('>>---------------------2222222', authStatus);
        return authStatus;
    }
    return next();
};