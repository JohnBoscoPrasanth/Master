const nodeEnv = require('custom-env');
const path = require('path');

const {
  APP_PORT,
  APP_ENV,
  APP_HOSTNAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  APP_ADMIN_EMAIL,
  APP_ADMIN_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA,
  DB_DIALECT,
  USER_SIGNATURE,
  CLIENTId,
  CLIENT_SECRET,
  GRANT_TOKEN,
  REDIRECT_URL,
  AWS_ACCESSKEY,
  AWS_SECRETKEY,
  AWS_REGION,
} = process.env.APP_SECRET ? JSON.parse(process.env.APP_SECRET) : {};

nodeEnv.env(process.env.NODE_ENV || 'local', './env');

module.exports = {
  app: {
    port: parseInt(APP_PORT || process.env.APP_PORT, 10) || 8090,
    env: APP_ENV || process.env.APP_ENV,
    hostname: APP_HOSTNAME || process.env.APP_HOSTNAME,
    accesstoken: ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET,
    refreshtoken: REFRESH_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET,
    uploadDir: path.join(__dirname, process.env.APP_UPLOAD_DIR) || '/public/uploads',
    adminEmail: APP_ADMIN_EMAIL || process.env.APP_ADMIN_EMAIL,
    adminPassword: APP_ADMIN_PASSWORD || process.env.APP_ADMIN_PASSWORD,
    enableCache: parseInt(process.env.ENABLE_CACHE, 10) === 1,
    userSignature: USER_SIGNATURE || process.env.USER_SIGNATURE,
    clientId: CLIENTId || process.env.CLIENTId,
    clientSecret: CLIENT_SECRET || process.env.CLIENT_SECRET,
    grantToken: GRANT_TOKEN || process.env.GRANT_TOKEN,
    redirectURL: REDIRECT_URL || process.env.REDIRECT_URL,
    accesskey: AWS_ACCESSKEY || process.env.AWS_ACCESSKEY,
    secretkey: AWS_SECRETKEY || process.env.AWS_SECRETKEY,
    region: AWS_REGION || process.env.AWS_REGION,
  },
  log: {
    logEnable: parseInt(process.env.LOG_ENABLE, 10) === 1,
    logEnableConsole: parseInt(process.env.LOG_ENABLE_CONSOLE, 10) === 1,
    logSuccess: process.env.LOG_SUCCESS ? process.env.LOG_SUCCESS : 1,
    logError: process.env.LOG_ERROR ? process.env.LOG_ERROR : 1,
    logPerformance: process.env.LOG_PERFORMANCE ? process.env.LOG_PERFORMANCE : 1,
    logMaxSize: process.env.LOG_MAXSIZE ? process.env.LOG_MAXSIZE : '128m',
    logMaxFiles: process.env.LOG_MAXFILES ? process.env.LOG_MAXFILES : '14d',
    logDebugMode: process.env.LOG_DEBUGLEVEL ? process.env.LOG_DEBUGLEVEL : 'info',
  },
  db: {
    dialect: DB_DIALECT || process.env.DB_DIALECT,
    host: DB_HOST || process.env.DB_HOST,
    port: parseInt(DB_PORT || process.env.DB_PORT, 10) || 3306,
    username: DB_USER || process.env.DB_USER,
    password: DB_PASSWORD || process.env.DB_PASSWORD,
    database: DB_NAME || process.env.DB_NAME,
    debug: process.env.DB_DEBUG,
    schema: DB_SCHEMA || process.env.DB_SCHEMA,
    poolMax: parseInt(process.env.DB_POOL_MAX, 10) || 5,
    poolMin: parseInt(process.env.DB_POOL_MIN, 10) || 0,
    poolAcquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 15000,
    pollIdle: parseInt(process.env.DB_POOLIdLE, 10) || 10000,
  },
};