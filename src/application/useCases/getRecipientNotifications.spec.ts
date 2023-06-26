import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { randomUUID } from 'node:crypto';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Get Recipient Notifications', () => {
  test('it should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    for (let i = 0; i < 3; i++) {
      await notificationsRepository.create(makeNotification({ recipientId }));
    }

    // Notification with different recipient id should not be found
    await notificationsRepository.create(makeNotification());

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
