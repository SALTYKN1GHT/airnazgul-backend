import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
  SECRET_KEY: process.env.SECRET_KEY,
};
