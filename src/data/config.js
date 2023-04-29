import * as sqlite3 from "sqlite3";
import { Sequelize } from "sequelize";
import fs, { existsSync } from "fs";


export const sequelize = new Sequelize("posts", "", "", {
    dialect: "sqlite",
    //storage: ".src/data/posts.db",
    host: ".src/data/IVR.db",
})

export async function syncDB() {
    if (existsSync(".src/data/IVR.db")) {
        (async function () {
            try {
                await sequelize.sync().then(() => {
                    console.log("DB synchronized");
                })
                return true;
            } catch (error) {
                console.log("DB ERROR -", error)
                return false;
            }
        })()
    } else {
        console.log("DB ERROR - database not found")
        return false;
    }
}