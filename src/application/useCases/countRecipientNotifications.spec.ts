import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { randomUUID } from 'node:crypto';
import { CountRecipientNotifications } from './countRecipientNotifications';

describe('Count Recipient Notifications', () => {
  test('it should count 3 notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    for (let i = 0; i < 3; i++) {
      await notificationsRepository.create(makeNotification({ recipientId }));
    }

    // Notification with different recipient id should not be counted
    await notificationsRepository.create(makeNotification());

    const result = await countRecipientNotifications.execute({ recipientId });

    expect(result.count).toEqual(3);
  });
});
