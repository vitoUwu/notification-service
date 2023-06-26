import { Notification } from './notification';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      content: 'Você possui uma nova mensagem',
      category: 'social',
      recipientId: 'recipientId',
    });

    expect(notification).toBeTruthy();
  });
});
