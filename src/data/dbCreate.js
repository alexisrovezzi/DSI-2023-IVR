import * as sqlite3 from "sqlite3";

// Este codigo permite la creación de una nueva BD // This code creates a new DB.
export const db = new sqlite3.default.Database("./src/data/IVRDB.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
    }
})