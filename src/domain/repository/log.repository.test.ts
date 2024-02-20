import { LogRepositoryImpl } from "../../infrastructure/repositories/log-impl.repository";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";


describe('LogRespositoryImpl', () => {


    const mockLogdatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const logRepository = new LogRepositoryImpl(mockLogdatasource);

    beforeEach(() => {

        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments', async () => {

        const log = { level: LogSeverityLevel.high, message: 'test message' } as LogEntity;
        await logRepository.saveLog(log);
        expect(mockLogdatasource.saveLog).toHaveBeenCalledWith(log);


    });

    test('getLogs should call the datasource with arguments', async () => {

        const lowSeverity = LogSeverityLevel.low;

        await logRepository.getLogs(lowSeverity);
        expect(mockLogdatasource.getLogs).toHaveBeenCalledWith(lowSeverity);



    })


})