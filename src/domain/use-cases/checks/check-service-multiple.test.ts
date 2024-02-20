// **Import necessary modules for testing**
import { LogRepository } from "../../repository/log.repository";
import { CheckServiceMultiple } from "./check-service-multiple";
import { LogEntity } from "../../entities/log.entity";

// **Test suite for CheckServiceMultiple use case**
describe("CheckService multiple use case", () => {

    // **Create mock repositories for testing**
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    // **Create mock callbacks for success and error scenarios**
    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    // **Instantiate CheckServiceMultiple with mocks**
    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        succesCallback,
        errorCallback
    );

    // **Clear mocks before each test**
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // **Test successful service check**
    test("should call SuccesCallback when the fetch returns true", async () => {
        // Simulate successful service check
        const wasOk = await checkServiceMultiple.execute("https://google.com");

        // Verify expected outcomes
        expect(wasOk).toBeTruthy();
        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));
    });

    // **Test failed service check**
    test("should call errorCallback when the fetch returns false", async () => {
        // Simulate failed service check
        const wasOk = await checkServiceMultiple.execute("https://googsaghfdse.com");

        // Verify expected outcomes
        expect(wasOk).toBeFalsy();
        expect(errorCallback).toHaveBeenCalled();
        expect(succesCallback).not.toHaveBeenCalled();
        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));
    });
});
