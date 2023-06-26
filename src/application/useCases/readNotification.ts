import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';

interface ReadNotificationRequest {
  id: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: ReadNotificationRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
