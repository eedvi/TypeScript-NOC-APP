// **Import necessary modules for testing**
import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

// **Test suite for CheckService use case**
describe("CheckService UseCase", () => {

    // **Create a mock repository for testing**
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    // **Create mock callbacks for success and error scenarios**
    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    // **Instantiate CheckService with mocks**
    const checkService = new CheckService(
        mockRepository,
        succesCallback,
        errorCallback
    );

    // **Clear mocks before each test**
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // **Test successful service check**
    test("should call succesCallback when fetch returns true", async () => {
        // Simulate successful service check
        const wasOk = await checkService.execute("https://google.com");

        // Verify expected outcomes
        expect(wasOk).toBe(true);
        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });

    // **Test failed service check**
    test("should call errorCallback when fetch returns false", async () => {
        // Simulate failed service check
        const wasOk = await checkService.execute("https:/wwdiuhfr/gsdasoogle.com");

        // Verify expected outcomes
        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(succesCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });
});
