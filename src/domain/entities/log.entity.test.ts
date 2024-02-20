


// Import necessary entities and severity levels
import { LogEntity, LogSeverityLevel } from "./log.entity";

// **Test suite for the LogEntity class**
describe("LogEntity", () => {

    // **Sample data object for creating LogEntity instances**
    const dataObj = {
        message: "Hi world!", // Log message
        level: LogSeverityLevel.low, // Log severity level (low)
        origin: "log.entity.test.ts", // Origin of the log
    };

    // **Test creating a LogEntity instance using a data object**
    test("should create a LogEntity instance", () => {
        // Create a log object using the data object
        const log = new LogEntity(dataObj);

        // Verify that the created object is a LogEntity instance
        expect(log).toBeInstanceOf(LogEntity);

        // Verify that the log properties match the data object values
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);

        // Verify that the createdAt property is of type Date
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    // **Test creating a LogEntity instance from JSON string**
    test("should create a LogEntity instance from json", () => {
        // JSON string representing a log entity
        const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2024-02-14T15:37:15.320Z","origin":"check-service.ts"}`;

        // Create a log object from the JSON string
        const log = LogEntity.fromJson(json);

        // Verify that the created object is a LogEntity instance
        expect(log).toBeInstanceOf(LogEntity);

        // Verify that the log properties match the JSON values
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");

        // Verify that the createdAt property is of type Date
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    // **Test creating a LogEntity instance from a plain object**
    test("should create a LogEntity instance from object", () => {
        // Create a log object directly from the data object
        const log = LogEntity.fromObject(dataObj);

        // Verify that the created object is a LogEntity instance
        expect(log).toBeInstanceOf(LogEntity);

        // Verify that the log properties match the data object values
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);

        // Verify that the createdAt property is of type Date
        expect(log.createdAt).toBeInstanceOf(Date);
    });

});
