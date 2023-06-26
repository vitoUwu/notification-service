import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Cancel Notification', () => {
  test('it should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();
    await notificationsRepository.create(notification);
    await cancelNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({ id: 'non-existing-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
