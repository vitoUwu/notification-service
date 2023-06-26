import { NotificationsRepository } from '@application/repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      request.recipientId,
    );
    return { count };
  }
}
