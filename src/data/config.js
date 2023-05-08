import * as sqlite3 from "sqlite3";
import { Sequelize } from "sequelize";
import fs, { existsSync } from "fs";


export const sequelize = new Sequelize("IVRDB", "", "", {
    dialect: "sqlite",
    storage: "./src/data/IVRDB.db",
    //host: "./src/data/IVRDB.db",
})

export async function syncDB() {
    try {
        await fs.access("./src/data/IVRDB.db", (async function () {
            try {
                await sequelize.sync().then(() => {
                    console.log("DB OK - synchronized");
                })
                return true;
            } catch (error) {
                console.log("DB ERROR -", error)
                return false;
            }
        }))
    } catch (error) {
        console.log("DB ERROR - database not found", error)
        return false;
    }
}