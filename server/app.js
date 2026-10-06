// * Import module library
import express from "express";
import useragent from "express-useragent";
import requestIp from "request-ip";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss-clean";


// ทุกโปรเจค แก้ที่นี่
/********************************************************** */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const swaggerFile = require('../swagger_output.json');
import swaggerUi from 'swagger-ui-express';

/********************************************************** */
import dotenv from "dotenv";
dotenv.config();

// * Import file system
const logger = setLogger(import.meta.url);
import { setLogger } from "./utils/logger.util.js";
import appRoute_v1 from "./routes_v1.js";
import appRoute_v2 from "./routes_v2.js";
import { responseHandler, responseHandlerV2 } from "./middlewares/response.middleware.js";
import { setResponseBody } from "./utils/response.util.js";


const app = express();


// * Set morgan log http.
app.use(
  morgan(function (tokens, req, res) {
    const msg =
      "________ " +
      tokens.method(req, res) +
      " || " +
      tokens.status(req, res) +
      " || " +
      tokens.url(req, res) +
      " || " +
      tokens["response-time"](req, res) +
      " || " +
      "ms " +
      tokens["user-agent"](req, res) +
      "________";
    logger.http(msg);
    return null;
  })
);

// * Set middleware application
app.use(cors());
app.use(helmet());
// * Set body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(hpp());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// * Set starter middleware
app.use(useragent.express());
app.use(requestIp.mw());
app.use((request, response, next) => {
  logger.info(
    ":::::::::::::::::::::::> Start Request <::::::::::::::::::::::::"
  );
  logger.info(
    ":::: route " + request.url + " || ip : " + request.clientIp + " ::::"
  );
  next();
});

// * Set base routes
//   /v1 : รูปแบบเดิม (front end ปัจจุบันใช้อยู่)  HTTP status แบบเดิม
//   /v2 : path แบบ REST (/plang/:plang_id) + validate input + HTTP status ตรงกับ code
app.use("/v1", appRoute_v1);
app.use("/v2", appRoute_v2);
app.use("/v2", unknownRoute, responseHandlerV2);   // error / 404 ของ /v2 มาจบที่ handler ของ v2

// * Swagger  (ปิดได้ด้วย SWAGGER_ENABLED=false ใน .env)
if (process.env.SWAGGER_ENABLED !== "false") {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true, docExpansion: "none", filter: true },
  }));
}

// * Set Undefinded route (Case 404)
app.use("*", unknownRoute);

// * Set response handlers
app.use(responseHandler);

async function unknownRoute(request, response, next) {
  logger.warn(`Undefinded route.. ${request.method} ${request.originalUrl}`);
  next(await setResponseBody(404, null, `ไม่พบเส้น API: ${request.method} ${request.originalUrl}`));
}

export default app;
