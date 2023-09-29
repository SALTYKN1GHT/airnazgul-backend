import app from "./app.js";
import { db } from "./connection/connection.js";

db.checkConnection();
db.initUserTable();

db.initTicketTable();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
