import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from 'nodemailer';



describe("EmailService", () => {

    const mockSendMail = jest.fn();

    //Mock to createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test("should send email", async () => {


        const options: SendEmailOptions = {
            to: 'ganey23519@ebuthor.com',
            subject: 'Test',
            htmlBody: '<h1>Hi</h1>'
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            "to": "ganey23519@ebuthor.com",
            "subject": "Test",
            "html": "<h1>Hi</h1>",
            "attachments": expect.any(Array),
        });
    })

    test("should send email with attachment", async () => {

        const email = 'ganey23519@ebuthor.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'server logs',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
            ])
        })
    })
})