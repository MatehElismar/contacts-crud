import { connect } from "mongoose";

const url = process.env.DB_URL || "";

// Method that establishes connection with the mongodb database.
export async function startDBConnection() {
  await connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((dbInfo) => {
      console.log(
        `Database Connected: ${dbInfo.connections[0].db.databaseName}`
      );
    })
    .catch((err) => {
      console.error("Database Error", err);
    });
}
