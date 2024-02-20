import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface Attachment {
    filename: string,
    path: string,

}

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}





export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });


    constructor() { }



    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });


            return true;
        } catch (error) {
            return false;
        }

    }
    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'server logs';
        const htmlBody = `<body style="color: #005B41;  font-family: Arial, sans-serif; padding: 20px;">
        <div style="background-color: #232D3F; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
          
          <h1>Potential Issues Detected</h1>
          <p>This email is to notify you of potential issues identified in the logs of your system.</p>
      
          <p>We recommend investigating these alerts to determine the cause and take appropriate action to resolve them. You can access the detailed logs for further analysis.</p>
      
          <p>Thank you for your attention to this matter.</p>

          <br>
      
          <p>Sincerely,</p>
          <p>The NOC Team</p>
        </div>
      </body>
      
      `
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },

        ]
        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }
}