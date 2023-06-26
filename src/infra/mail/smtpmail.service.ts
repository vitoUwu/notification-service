import { MailService } from './mail.service';

export class SMTPMailService implements MailService {
  sendMail(): Promise<void> {
    throw Error('Not implemented yet');
  }

  getService(): string {
    return 'SMTP Mail';
  }
}
