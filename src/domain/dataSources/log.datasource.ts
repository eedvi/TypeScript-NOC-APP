import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export default abstract class LogDatasource { // The class representing individual log entries 
    abstract saveLog(log: LogEntity): Promise<void>; // Declares an abstract method that must be implemented by concrete subclasses.
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>; //Declares another abstract method that must be implemented by concrete subclasses.

}



