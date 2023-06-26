import { CancelNotification } from '@application/useCases/cancelNotification';
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications';
import { ReadNotification } from '@application/useCases/readNotification';
import { SendNotification } from '@application/useCases/sendNotification';
import { UnreadNotification } from '@application/useCases/unreadNotification';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
