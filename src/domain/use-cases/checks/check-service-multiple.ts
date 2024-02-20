import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}



type SuccesCallback = (() => void) | undefined;
type ErrorCallback = (error: string) => void;



export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logepository: LogRepository[],
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }

    private callLogs(log: LogEntity) {
        this.logepository.forEach(logRepository => {
            logRepository.saveLog(log);
        });
    }


    public async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on service ${url}`);
            }
            const log = new LogEntity({
                message: `${url} is okay`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.succesCallback && this.succesCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not okay. ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.errorCallback && this.errorCallback(errorMessage);

            return false;
        }
    }
}