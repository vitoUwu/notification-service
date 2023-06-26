import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { ReadNotification } from './readNotification';

describe('Read Notification', () => {
  test('it should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();
    await notificationsRepository.create(notification);
    await readNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({ id: 'non-existing-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
