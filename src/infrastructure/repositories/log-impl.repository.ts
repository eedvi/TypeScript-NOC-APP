import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository'

export class LogRepositoryImpl implements LogRepository {

    constructor(

        private readonly logDataSource: LogRepository

    ) { }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    }

    async getLogs(severityLevelL: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevelL);
    }



}