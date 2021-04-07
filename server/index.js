
/**
 * @imports
 */
import oauth2 from '@webqit/oauth2-node-client';

/**
 * Create the OAuth2 middleware
 */
var oauth2Middleware;
const getOauth2Middleware = env => {
    if (!oauth2Middleware) {
        oauth2Middleware = oauth2.createMiddleware({
            clientId:       env.OAUTH_CLIENT_ID,
            clientSecret:   env.OAUTH_CLIENT_SECRET,
            endpoints: {
                baseUrl:    env.OAUTH_ENDPOINT_HOST,
                login:      env.OAUTH_LOGIN_ENDPOINT,
                token:      env.OAUTH_TOKEN_ENDPOINT,
                logout:     env.OAUTH_LOGOUT_ENDPOINT,
            },
            callbacks: {
                baseUrl:    env.OAUTH_CALLBACK_HOST,
                login:      env.OAUTH_LOGIN_CALLBACK,
                logout:     env.OAUTH_LOGOUT_CALLBACK,
            },
            sesskey:        env.OAUTH_SESSION_KEY,
        });
    }
    return oauth2Middleware;
};


/**
 * 
 * @param Object    process 
 * @param Object    recieved 
 * @param Function  next 
 */
export default async function(request, recieved, next) {
    return this.walk(getOauth2Middleware(this.env)).then(async () => {
        var auth = { oauth: request.oauth, };
        if (next.pathname) {
            return next(auth);
        }
        return {};
    });
};
