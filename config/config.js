const {env}=process

const SERVER_PORT = env.SERVER_PORT;
const DB_HOST = env.DB_HOST;
const DB_PORT = env.DB_PORT;
const DB_USER = env.DB_USER;
const DB_PASSWORD = env.DB_PASSWORD;
const DB_NAME = env.DB_NAME;
const DB_DIALECT = env.DB_DIALECT;

console.log("variables: ", env.DB_HOST)

export {
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
};
