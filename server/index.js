
/**
 * @imports
 */
import oauth2 from '@webqit/oauth2-node-client';

/**
 * Create the OAuth2 middleware
 */
const oauth2Middleware = oauth2.createMiddleware({
    client: {
        id: '1ayAQcm06EvEa5y9QMU3IOu0R48u29zA',//process.env.OAUTH_CLIENT_ID,
        secret: 'QABhf5-pT2d1tEFTnvIXmqU9SMEpQPlPljdQ6ghvWFJSXTd_TC8-_l38AdU6kwWA',//process.env.OAUTH_CLIENT_SECRET,
        baseUrl: 'https://neatly-fit2.us.auth0.com',//process.env.OAUTH_CLIENT_BASE_URL,
        loginEndpoint: '/authorize',//process.env.OAUTH_CLIENT_LOGIN_ENDPOINT,
        tokenEndpoint: '/oauth/token',//process.env.OAUTH_CLIENT_TOKEN_ENDPOINT,
        logoutEndpoint: '/v2/logout',//process.env.OAUTH_CLIENT_LOGOUT_ENDPOINT,
    },
    callbacks: {
        baseUrl: 'http://localhost:3000',
        loginEndpoint: '/login',//process.env.OAUTH_APP_LOGIN_ENDPOINT,
        logoutEndpoint: '/',//process.env.OAUTH_APP_LOGOUT_ENDPOINT,
    },
});

/**
 * 
 * @param Object process 
 * @param Object recieved 
 * @param Function next 
 */
export default async function(request, recieved, next) {
    return this.walk(oauth2Middleware).then(async () => {
        if (next.pathname === 'favicon.ico' || next.pathname === 'worker.js') {
            return;
        }
        if (!recieved) {
            recieved = {};
        }
        var authStatus;
        recieved.oauth = request.oauth;
        if (next.pathname) {
            authStatus = await next(recieved);
        }
        console.log('>>', authStatus);
        //recieved.oauth.logout();
        //request.oauth.logout();
        return {}//next(recieved);
    });
};
