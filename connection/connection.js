import config from "../config.js";
import mysql from "mysql";
import LoggingService from "../services/logging.service.js";
import { log } from "console";

const loggingService = new LoggingService();

const databaseConnection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  port: config.mysql.port,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  checkConnection() {
    databaseConnection.connect((err) => {
      if (err) {
        console.log(`Cannot connect to the database, ${err}`);
        return;
      }
      console.log("Database Connection is OK");
    });
  },
  query(query, values = []) {
    return new Promise((resolve, reject) => {
      databaseConnection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(JSON.stringify(result)));
      });
    });
  },

  async initTicketTable() {
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS ticket (
          id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
          name varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          validity_start DATE NULL,
          validity_end DATE NULL,
          price FLOAT NULL,
          available INT(11),
          type varchar(45) NULL,
          created DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
          isActive TINYINT NULL DEFAULT 1)`
      );
    } catch (err) {
      console.log(`Error creating user table: (${err})`);
    }
  },

  async initUserTable() {
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS user (
          id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
          userName varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          isAdmin tinyint NULL DEFAULT 0)`
      );
    } catch (err) {
      console.log(`Error creating user table: (${err})`);
    }
  },

  async initOrdersTable() {
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS orders (
          id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
          ticketId int(11) NOT NULL,
          userId int(11) NOT NULL,
          amount INT NOT NULL,
          FOREIGN KEY (ticketId) REFERENCES ticket(id),
          FOREIGN KEY (userId) REFERENCES user(id)
        )`
      );
    } catch (err) {
      console.log(`Error creating orders table: (${err})`);
    }
  },
  async initDestinationsTable() {
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS destinations (
           id INT NOT NULL AUTO INCREMENT PRIMARY KEY,
          realm VARCHAR(255) NOT NULL,
          settlement VARCHAR(255) NOT NULL UNIQUE
        )`
      );
    } catch (err) {
      console.log(`Error creating orders table: (${err})`);
    }
  },
};
