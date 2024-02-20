import { LogEntity, LogSeverityLevel } from "../entities/log.entity"; // Import information about logs

// this is like a blueprint for any system that stores and retrieves log messages
export abstract class LogRepository {

    // Like putting a message in a special box for safekeeping
    abstract saveLog(log: LogEntity): Promise<void>; // it might take a little time

    // Like searching through those boxes based on the importance of the message
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>; // Returns an array of messages
}
