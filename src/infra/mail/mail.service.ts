export abstract class MailService {
  abstract sendMail(): Promise<void>;
  abstract getService(): string;
}
