import { Notification } from '@application/entities/notification/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  public static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  public static toDomain(raw: PrismaNotification) {
    return new Notification(
      {
        category: raw.category,
        content: raw.content,
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
