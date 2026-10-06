import dotenv from "dotenv";
dotenv.config();

// Common const
export const CREATE_BY_DEFAULT = "Application Service";

// Constants
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const ROOT_PATH = process.env.ROOT_PATH;
export const LOG_DIR = process.env.LOG_DIR;

// Database configuration
export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_PORT = process.env.DATABASE_PORT;

export const LOCAL_DATABASE_NAME = process.env.LOCAL_DATABASE_NAME;
export const LOCAL_DATABASE_USER = process.env.LOCAL_DATABASE_USER;
export const LOCAL_DATABASE_PASSWORD = process.env.LOCAL_DATABASE_PASSWORD;
export const LOCAL_DATABASE_HOST = process.env.LOCAL_DATABASE_HOST;
export const LOCAL_SWAGGER_DOCS = process.env.LOCAL_SWAGGER_DOCS;

export const SERVER_DATABASE_NAME = process.env.SERVER_DATABASE_NAME;
export const SERVER_DATABASE_USER = process.env.SERVER_DATABASE_USER;
export const SERVER_DATABASE_PASSWORD = process.env.SERVER_DATABASE_PASSWORD;
export const SERVER_DATABASE_HOST = process.env.SERVER_DATABASE_HOST;
export const SERVER_DATABASE_PORT = process.env.SERVER_DATABASE_HOST;
export const SERVER_SWAGGER_DOCS = process.env.SERVER_SWAGGER_DOCS;

export const DUCK_DATABASE_NAME = process.env.DUCK_DATABASE_NAME;
export const DUCK_DATABASE_USER = process.env.DUCK_DATABASE_USER;
export const DUCK_DATABASE_PASSWORD = process.env.DUCK_DATABASE_PASSWORD;
export const DUCK_DATABASE_HOST = process.env.DUCK_DATABASE_HOST;
export const DUCK_SWAGGER_DOCS = process.env.DUCK_SWAGGER_DOCS;

export const CLOUD_DATABASE_NAME = process.env.CLOUD_DATABASE_NAME;
export const CLOUD_DATABASE_USER = process.env.CLOUD_DATABASE_USER;
export const CLOUD_DATABASE_PASSWORD = process.env.CLOUD_DATABASE_PASSWORD;
export const CLOUD_DATABASE_HOST = process.env.CLOUD_DATABASE_HOST;
export const CLOUD_SWAGGER_DOCS = process.env.CLOUD_SWAGGER_DOCS;


// Encrypt Key
export const PUBLIC_KEY_URL = process.env.PUBLIC_KEY_URL;
export const PRIVATE_KEY_URL = process.env.PRIVATE_KEY_URL;
export const CRYPTO_IV = process.env.CRYPTO_IV;
export const CRYPTO_KEY = process.env.CRYPTO_KEY;

//jwt token
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_SECRET_TOKEN_EXPIRES = '100d';
export const JWT_SECRET_REFRESH_TOKEN_EXPIRES = '30d';
export const JWT_EXPIRED_MILLISECONDS = 1000;

// Constants
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_PORT = process.env.REDIS_PORT;

export const BEARER_TOKEN = 'Bearer';