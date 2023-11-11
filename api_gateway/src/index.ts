import express from 'express';
import cookieParser from 'cookie-parser';
import { setupProxies } from './proxy/proxy';
import { routes_config, ws_collab_proxy_config, ws_match_proxy_config } from './proxy/routes_config';
import { jwtCheck, onCredentialFailure } from './middleware/token_check';
import { setupLogging } from './middleware/logging';
import { isLocal } from './proxy/service_addresses';
import { createProxyMiddleware } from 'http-proxy-middleware';

const httpApp = express();
const httpProxyPort: number = parseInt(process.env.PORT || "8000");

const wsMatchMakeApp = express();
const wsMatchMakePort : number = parseInt(process.env.PORT || "7999");

const wsCollabApp = express();
const wsCollabAppPort : number = parseInt(process.env.PORT || "7998");


httpApp.use(cookieParser())

setupLogging(httpApp);
httpApp.use(jwtCheck.unless({ path: [/\/auth\//] }));
httpApp.use(onCredentialFailure);

setupProxies(httpApp, routes_config);
setupProxies(wsMatchMakeApp, ws_match_proxy_config)
setupProxies(wsCollabApp, ws_collab_proxy_config)




httpApp.listen(httpProxyPort, () => {
    console.log(`API Gateway running in ${isLocal ? "local" : "docker"} mode`)
    console.log(`API Gateway listening at http://localhost:${httpProxyPort}`);
})

wsMatchMakeApp.listen(wsMatchMakePort, () => {
    console.log(`API Gateway running in ${isLocal ? "local" : "docker"} mode`)
    console.log(`API Gateway listening at http://localhost:${wsMatchMakePort}`);
})

wsCollabApp.listen(wsCollabAppPort, () => {
    console.log(`API Gateway running in ${isLocal ? "local" : "docker"} mode`)
    console.log(`API Gateway listening at http://localhost:${wsCollabAppPort}`);
})