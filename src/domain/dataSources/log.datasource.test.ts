// Import log entities and severity levels
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Import the abstract LogDatasource class
import LogDatasource from "./log.datasource";

// **Define a new log entity for testing**
const newLog = new LogEntity({
    origin: "log.datasource.test.ts", // Origin of the log
    message: "test-message", // Message of the log
    level: LogSeverityLevel.low, // Log severity level (low)
});

// **Implement a MockLogDatasource class simulating LogDatasource behavior**
class MockLogDatasource implements LogDatasource {
    // **Simulate log saving without any action**
    async saveLog(log: LogEntity): Promise<void> {
        // No action performed, just simulates log saving
        return;
    }

    // **Simulate fetching logs, always returning the newly created log**
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // Return the new log regardless of the severity level
        return [newLog];
    }
}

// **Test suite for the LogDatasource class**
describe("log.datasource.ts Logdatasource", () => {
    // **Initialize a MockLogDatasource instance for testing**
    const mockLogDatasource = new MockLogDatasource();

    // **Test existence and definition of the LogDatasource class**
    test("should test the abstract class", async () => {
        // Verify that the LogDatasource class is defined
        expect(LogDatasource).toBeDefined();

        // Verify that mockLogDatasource instance is of MockLogDatasource type
        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);

        // Verify that saveLog method exists and is a function
        expect(typeof mockLogDatasource.saveLog).toBe("function");

        // Verify that getLogs method exists and is a function
        expect(typeof mockLogDatasource.getLogs).toBe("function");

        // **Simulate saving the new log**
        await mockLogDatasource.saveLog(newLog);

        // **Simulate fetching logs with high severity level**
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        // **Verify the number of fetched logs**
        expect(logs).toHaveLength(1); // Expect only one log

        // **Verify the type of the first fetched log**
        expect(logs[0]).toBeInstanceOf(LogEntity); // Expect a LogEntity object
    });
});
