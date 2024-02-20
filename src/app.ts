import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins'
import { MongodataBase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";




(async () => {
    main();
})();

async function main() {

    await MongodataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    Server.start();
}