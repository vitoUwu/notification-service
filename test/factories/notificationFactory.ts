import {
  Notification,
  // eslint-disable-next-line prettier/prettier
  NotificationProps
} from '@application/entities/notification/notification';
import { Replace } from '@helpers/Replace';

type Override = Partial<Replace<NotificationProps, { content: string }>>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: 'Você tem uma nova solicitação de amizade',
    recipientId: 'recipientId',
    ...override,
  });
}
