




import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}



type SuccesCallback = (() => void) | undefined;
type ErrorCallback = (error: string) => void;



export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logepository: LogRepository,
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }


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
            this.logepository.saveLog(log)
            this.succesCallback && this.succesCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not okay. ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage);

            return false;
        }
    }
}