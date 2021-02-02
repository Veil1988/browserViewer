import EventSource from 'eventsource';
import { MessageProps } from './../../../utils/messageSending/interfaces';

export interface ConnectionStoreProps {
  // ** статус сессии */
  status: keyof typeof SessionStatusEnum | null;
  // ** SSE конструктор для получения сессий в статусе await */
  eventSource: EventSource | null;
  // ** входящее сообщение id сессий в статусе await */
  idUserSessionAwaitList: [] | number[];
  // ** id сессии для оператора */
  sessionId: number | null;
  // ** входящее сообщение message от пользователя */
  entryMessage: MessageProps | {};
}

// ** статусы сессии await|active */
export enum SessionStatusEnum {
  await = 'await',
  active = 'active',
}
