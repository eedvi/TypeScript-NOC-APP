import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './cron/cron-service'
import { FileSystemdataSource } from "../infrastructure/dataSources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from '../domain/use-cases/checks/email/send-email-logs';
import { MongoLogdataSource } from '../infrastructure/dataSources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/dataSources/postgres-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemdataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogdataSource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)



// const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log("Sever started...");


        //todo:  Send e-mail
        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute(
        //     'vicenterafael683@gmail.com'
        // )



        // emailService.sendEmailWithFileSystemLogs(
        //     ['vicenterafael683@gmail.com']
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://google.com'
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`Service ${url} working`),
                    (error) => console.log(error),
                ).execute(url);
            });

    }
}

