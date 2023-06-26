import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { UnreadNotification } from './unreadNotification';

describe('Read Notification', () => {
  test('it should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);
    await unreadNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({ id: 'non-existing-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
