
/**
 * @imports
 */
import oauth2 from '@webqit/oauth2-node-client';

/**
 * Create the OAuth2 middleware
 */
const oauth2Middleware = oauth2.createMiddleware({
    clientId:       process.env.OAUTH_CLIENT_ID,
    clientSecret:   process.env.OAUTH_CLIENT_SECRET,
    endpoints: {
        baseUrl:    process.env.OAUTH_ENDPOINT_HOST,
        login:      process.env.OAUTH_LOGIN_ENDPOINT,
        token:      process.env.OAUTH_TOKEN_ENDPOINT,
        logout:     process.env.OAUTH_LOGOUT_ENDPOINT,
    },
    callbacks: {
        baseUrl:    process.env.OAUTH_CALLBACK_HOST,
        login:      process.env.OAUTH_LOGIN_CALLBACK,
        logout:     process.env.OAUTH_LOGOUT_CALLBACK,
    },
    sesskey:        process.env.OAUTH_SESSION_KEY,
});

/**
 * 
 * @param Object    process 
 * @param Object    recieved 
 * @param Function  next 
 */
export default async function(request, recieved, next) {
    return this.walk(oauth2Middleware).then(async () => {
        var auth = { oauth: request.oauth, };
        if (next.pathname) {
            return next(auth);
        }
        return {};
    });
};
