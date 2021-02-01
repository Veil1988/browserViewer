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
  // TODO убрать any нахуй
  eventSource: any;
  // ** Входящее сообщение от оператора */
  // TODO убрать any нахуй
  entryMessage: any;
}
// ** статусы сессии await|active */
export enum SessionStatusEnum {
  await = 'await',
  active = 'active',
}

export interface FetchIdSessionResult {}
