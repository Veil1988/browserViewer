import { MessageProps } from './../../../utils/messageSending/interfaces';

export interface ConnectionStoreProps {
  // ** ID сессии */
  sessionId: number | null;
  // ** статус сессии */
  status: keyof typeof SessionStatusEnum | null;
  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession: () => void;
  //** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession: () => void;
  //** SSE */
  eventSource: EventSource | null;
  // ** Входящее сообщение от оператора */
  entryMessage: MessageProps | {};
}
// ** статусы сессии await|active */
export enum SessionStatusEnum {
  await = 'await',
  active = 'active',
}

export interface FetchIdSessionResult {}
