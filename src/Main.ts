import "reflect-metadata";

import { MongooseProvider } from "@providers/database/mongodb/orm/mongoose/Mongoose.Provider";
import Log, { LogLevel } from "@providers/logger/exception/ExceptionLogger.Provider";
import { container } from "@providers/server/Container.Provider";
import { ServerProvider } from "@providers/server/Server.Provider";
import { Env } from "env";


async function Boostrap() {
    const app = await ServerProvider.Create(container);
    app.Listen(Env.Server.DEFAULT_PORT);
}

Boostrap();


/* Shutdown the API */
process.on("SIGINT", () => {
    MongooseProvider.DefaultConnectionClose();
    Log(LogLevel.Info, "API is shutting down", "server-provider");
    process.exit(0);
});


