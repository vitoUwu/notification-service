import { Notification } from '@application/entities/notification/notification';
import { NotificationsRepository } from '@application/repositories/notificationRepository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.notifications.find(
        (notification) => notification.id === notificationId,
      ) || null
    );
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);
    if (index < 0) return;
    this.notifications[index] = notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
