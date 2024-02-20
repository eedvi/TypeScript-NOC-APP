
import LogDatasource from '../../domain/dataSources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import * as fs from 'fs';





export class FileSystemdataSource implements LogDatasource {


    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor() {
        this.createLogsFiles();
    }


    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);

        }



        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,

        ].forEach(path => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '')
        })

    }



    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsjson = `${JSON.stringify(newlog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsjson);

        if (newlog.level === LogSeverityLevel.low) return;

        if (newlog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsjson)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsjson);
        }
    }


    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');

        if (content === '') return [];

        const logs = content.split('\n').map(LogEntity.fromJson);

        // const logs = content.split('\n').map(
        //     logs => LogEntity.fromJson(logs)
        // );

        return logs;
    }




    async getLogs(severityLevelL: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevelL) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);


            default:
                throw new Error(`${severityLevelL} not implemented`)
        }


    }




}