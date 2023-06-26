import { Notification } from '@application/entities/notification/notification';
import { NotificationsRepository } from '@application/repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

interface getRecipientNotificationsRequest {
  recipientId: string;
}

interface getRecipientNotificationsResponse {
  notifications: Notification[] | [];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: getRecipientNotificationsRequest,
  ): Promise<getRecipientNotificationsResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(
        request.recipientId,
      );
    return { notifications };
  }
}
