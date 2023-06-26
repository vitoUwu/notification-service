import { Content } from './content';

describe('Notification Content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma nova mensagem');

    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('_')).toThrowError();
  });

  test('it should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('_'.repeat(241))).toThrowError();
  });
});
