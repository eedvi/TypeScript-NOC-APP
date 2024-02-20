import fs from 'fs';
import path from 'path';
import { FileSystemdataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import LogDatasource from '../../domain/dataSources/log.datasource';

describe("file-systemDatasource", () => {


    const logPath = path.join(__dirname, '../../../logs');



    beforeEach(() => {

        fs.rmSync(logPath, { recursive: true, force: true });

    });

    test('should create log files if they do not exist', () => {


        new FileSystemdataSource();
        const files = fs.readdirSync(logPath);



        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);

    });

    test('should save a log in all logs-all.log', () => {



        const LogDatasource = new FileSystemdataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.low,
            origin: 'fyle-sysrem.datasource.test.ts',
        });

        LogDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });


    test('should save a log in logs.all.log and logs-medium.log', () => {



        const LogDatasource = new FileSystemdataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.medium,
            origin: 'fyle-sysrem.datasource.test.ts',
        });

        LogDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');


        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));

    });


    test('should save a log in logs.all.log and logs-high.log', () => {



        const LogDatasource = new FileSystemdataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.high,
            origin: 'fyle-sysrem.datasource.test.ts',
        });

        LogDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');


        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test("should return all logs", async () => {


        const logDatasource = new FileSystemdataSource();
        const logLow = new LogEntity({
            message: "test",
            level: LogSeverityLevel.low,
            origin: 'fyle-sysrem.datasource.test.ts',
        });

        const logMedium = new LogEntity({
            message: "test",
            level: LogSeverityLevel.medium,
            origin: 'fyle-sysrem.datasource.test.ts',
        });


        const logHigh = new LogEntity({
            message: "test",
            level: LogSeverityLevel.high,
            origin: 'fyle-sysrem.datasource.test.ts',
        });


        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);


        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);


        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));



    });

    test('shoulkd not throw an error if path exists', () => {

        new FileSystemdataSource();
        new FileSystemdataSource();

        expect(true).toBeTruthy();


    });

    test('should throw an error if severity level is not defined', async () => {

        const logDatasource = new FileSystemdataSource();
        const customLogSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customLogSeverityLevel)

            expect(true).toBeFalsy();
        } catch (error) {

            const errorString = `${error}`;
            console.log(errorString);

            expect(errorString).toContain(`${customLogSeverityLevel} not implemented`)

        }
    })
})