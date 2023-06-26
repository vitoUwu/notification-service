import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';

interface UnreadNotificationRequest {
  id: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
