import { CancelNotification } from '@application/useCases/cancelNotification';
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications';
import { ReadNotification } from '@application/useCases/readNotification';
import { SendNotification } from '@application/useCases/sendNotification';
import { UnreadNotification } from '@application/useCases/unreadNotification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotification } from '../dtos/createNotification';
import {
  HTTPNotification,
  // eslint-disable-next-line prettier/prettier
  NotificationViewModel
} from '../viewModels/notificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ id });
  }

  @Get('from/:recipientId/count')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return count;
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string): Promise<{
    notifications: HTTPNotification[] | [];
  }> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ id });
  }

  @Post()
  async create(@Body() body: CreateNotification) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
