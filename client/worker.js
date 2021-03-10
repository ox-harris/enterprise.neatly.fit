
/**
 * @imports
 */
import Worker from 'C:/Users/ox_ha/Documents/CODE/webqit/webflo/modules/client/Worker.js';

/**
 * -----------------
 * Service Worker File
 * -----------------
 */

// >> Worker-Side Routing:
const routes = {};

// >> Worker Params
const params = {
   lifecycle_logs: true,
   scope: '/',
   cache_name: 'cache_v0',
   fetching_strategy: 'cache_first',
   caching_strategy: 'dynamic',
   caching_list: '',
   skip_waiting: false,
   support_messaging: true,
   message_routing_url_property: '',
   message_relay_flag_property: '',
   support_notification: false,
   push_registration_url: '',
   push_deregistration_url: '',
   push_public_key: '',
   notification_routing_url_property: '',
   notification_target_url_property: '',
   ROUTES: routes,
};

// >> Worker Instantiation
Worker.call(null, params);