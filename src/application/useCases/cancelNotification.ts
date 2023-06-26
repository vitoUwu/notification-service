import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';

interface CancelNotificationRequest {
  id: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
