
/**
 * @imports
 */
import oauth2 from '@webqit/oauth2-node-client';

/**
 * Create the OAuth2 middleware
 */
const oauth2Middleware = oauth2.createMiddleware({
    authorizationURL: process.env.OAUTH_AUTHORIZATION_URL,
    tokenURL: process.env.OAUTH_TOKEN_URL,
    callbackURL: process.env.OAUTH_CALLBACK_URL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
});

/**
 * 
 * @param Object process 
 * @param Object recieved 
 * @param Function next 
 */
export default async function(process, recieved, next) {
    return process.walk(oauth2Middleware).then(async () => {
        if (!recieved) {
            recieved = {};
        }
        var authStatus;
        recieved.oauth = process.request.oauth;
        if (next.pathname) {
            authStatus = await next(recieved, 'oauth2');
        }
        console.log('>>', authStatus);
        //recieved.oauth.logout();
        //process.request.oauth.logout();
        return {}//next(recieved);
    });
};