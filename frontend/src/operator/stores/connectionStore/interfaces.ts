import EventSource from 'eventsource';

export interface ConnectionStoreProps {
  // ** SSE конструктор для получения сессий в статусе await */
  eventSource: EventSource | null;
  // ** входящее сообщение id сессий в статусе await */
  idUserSessionAwaitList: [] | number[];
  // ** id сессии для оператора */
  sessionId: number | null;
  // ** входящее сообщение message от пользователя */
  // TODO сука валенок
  entryMessage: any;
}
