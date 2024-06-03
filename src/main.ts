import 'dotenv/config';
import * as http from "node:http";
import router from './router.js';

const server = http.createServer(router);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`setver starting in ${PORT} port`));
