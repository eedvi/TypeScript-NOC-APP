// **Import necessary modules for testing**
import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";
import { LogModel, MongodataBase } from "../../data/mongo";
import { MongoLogdataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// **Test suite for MongoLogDatasource**
describe("tests in MongoLogDatasource", () => {

    // **Create an instance of MongoLogdataSource and a sample log entity**
    const logdatasource = new MongoLogdataSource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: "test message",
        origin: "mongo-log.datasource.test.ts",
    });

    // **Connect to MongoDB before all tests**
    beforeAll(async () => {
        await MongodataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    // **Clean up logs after each test**
    afterEach(async () => {
        await LogModel.deleteMany();
    });

    // **Close MongoDB connection after all tests**
    afterAll(async () => {
        mongoose.connection.close();
    });

    // **Test saving a log**
    test("should create a log", async () => {

        // Spy on console.log to verify log creation message
        const logSpy = jest.spyOn(console, "log");

        // Save the log
        await logdatasource.saveLog(log);

        // Verify that the log was created and a message was logged
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(String));
    });

    // **Test retrieving logs**
    test("should get logs", async () => {
        // Save two logs
        await logdatasource.saveLog(log);


        // Retrieve logs with a specific severity level
        const logs = await logdatasource.getLogs(LogSeverityLevel.medium);

        // Verify that the retrieved logs have the expected properties
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});
