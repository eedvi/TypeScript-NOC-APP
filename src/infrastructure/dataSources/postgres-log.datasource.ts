// Import necessary modules
import { model } from "mongoose";     // Import for Mongoose (likely for other purposes, not used here directly)
import { LogModel } from "../../data/mongo";     // Import LogModel for MongoDB (likely for other purposes, not used here)
import LogDatasource from "../../domain/dataSources/log.datasource";  // Import base LogDatasource interface
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";  // Import LogEntity and LogSeverityLevel types
import { PrismaClient, SeverityLevel } from "@prisma/client";  // Import Prisma client for PostgreSQL interaction

// Instantiate Prisma client for database operations
const prismaClient = new PrismaClient();

// Map string severity levels to Prisma's SeverityLevel enum
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

// Class implementing the LogDatasource interface using PostgreSQL
export class PostgresLogDatasource implements LogDatasource {

    // Method to save a log to PostgreSQL
    async saveLog(log: LogEntity): Promise<void> {
        // Map string severity level to Prisma's SeverityLevel enum
        const level = severityEnum[log.level];
        // Create a new log record in PostgreSQL using Prisma client
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,  // Spread log properties
                level: level,  // Set mapped severity level
            }
        });
        console.log('Postgres log created:', newLog.id);  // Log the created log's ID
    }

    // Method to retrieve logs based on severity level
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // Map string severity level to Prisma's SeverityLevel enum
        const level = severityEnum[severityLevel];
        // Query PostgreSQL for logs with the specified severity level using Prisma client
        const dbLogs = await prismaClient.logModel.findMany({
            where: { level: level }  // Filter logs by severity level
        });
        // Map database records to LogEntity objects
        return dbLogs.map(LogEntity.fromObject);
    }
}
