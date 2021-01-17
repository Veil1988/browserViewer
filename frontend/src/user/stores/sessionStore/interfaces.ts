export interface SessionStoreProps {
  // ** ID сессии */
  sessionId: number | null;
  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession: () => void;
  //** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession: () => void;
}
// ** статусы сессии await|active */
export enum SessionStatusEnum {
  await = "await",
  active = "active"
}

export interface FetchIdSessionResult {

}
