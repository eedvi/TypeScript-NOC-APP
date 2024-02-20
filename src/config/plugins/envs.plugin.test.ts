// Import the envs plugin for testing
import { envs } from "./envs.plugins";

// **Test suite for the envs.plugin.ts file**
describe("envs.plugin.ts", () => {

    // **Test that environment options are correctly loaded**
    test("should return env options", () => {
        // Expected environment options
        const expectedEnvs = {
            PORT: 3000,
            MAILER_SERVICE: "gmail",
            MAILER_EMAIL: "ganey23519@ebuthor.com",
            MAILER_SECRET_KEY: "fvnzksvtshoqywkq",
            PROD: false,
            MONGO_URL: "mongodb://Rafael:123456789@localhost:27017/",
            MONGO_DB_NAME: "NOC-TEST",
            MONGO_USER: "Rafael",
            MONGO_PASS: "123456789",
        };

        // Verify that the loaded envs object matches the expected values
        expect(envs).toEqual(expectedEnvs);
    });

    // **Test that the plugin throws an error for invalid MAILER_EMAIL**
    test("should throw error if MAILER_EMAIL is not a valid email address", async () => {
        // Reset modules before each test to isolate environment variables
        jest.resetModules();

        // Set an invalid MAILER_EMAIL environment variable
        process.env.MAILER_EMAIL = "3dfkjhn";

        // Attempt to import the envs plugin and expect an error
        try {
            await import("./envs.plugins");
            expect(true).toBe(false); // This line should not be reached if an error occurs
        } catch (error) {
            // Verify that the error message contains the expected text
            expect(`${error}`).toContain('"MAILER_EMAIL" should be a valid email address');
        }
    });

    // **Test that the plugin throws an error for missing or invalid environment variables**
    test("should return error if not found env", async () => {
        // Reset modules before each test to isolate environment variables
        jest.resetModules();

        // Set an invalid value for PORT environment variable
        process.env.PORT = "jaja";

        // Attempt to import the envs plugin and expect an error
        try {
            await import("./envs.plugins");
            expect(true).toBe(false); // This line should not be reached if an error occurs
        } catch (error) {
            // Verify that the error message contains the expected text
            expect(`${error}`).toContain('env-var: "PORT" should be a valid integer');
        }
    });
});
