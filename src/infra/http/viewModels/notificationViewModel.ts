import { Notification } from '@application/entities/notification/notification';

export interface HTTPNotification {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt?: Date | null;
}

export class NotificationViewModel {
  public static toHTTP(notification: Notification): HTTPNotification {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
    };
  }
}
