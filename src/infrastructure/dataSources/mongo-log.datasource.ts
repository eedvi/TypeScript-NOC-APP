// Import necessary modules
import { LogModel } from "../../data/mongo";      // Import LogModel for MongoDB interaction
import LogDatasource from "../../domain/dataSources/log.datasource";  // Import base LogDatasource interface
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";  // Import LogEntity and LogSeverityLevel types

// Class implementing the LogDatasource interface using MongoDB
export class MongoLogdataSource implements LogDatasource {

    // Method to save a log to MongoDB
    async saveLog(log: LogEntity): Promise<void> {
        // Create a new log document in MongoDB using LogModel
        const newLog = await LogModel.create(log);
        // Implicitly saves the new log (no need for explicit save())
        console.log('Mongo log created:', newLog.id);  // Log the created log's ID
    }

    // Method to retrieve logs based on severity level
    async getLogs(severityLevelL: LogSeverityLevel): Promise<LogEntity[]> {
        // Query MongoDB for logs with the specified severity level
        const logs = await LogModel.find({
            level: severityLevelL  // Filter logs by severity level
        });
        // Map MongoDB documents to LogEntity objects
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
}
