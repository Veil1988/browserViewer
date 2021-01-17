export interface SessionStoreProps {
  // ** ID сессии */
  id: string | null;
  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession: () => void;
  //** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession: () => void;
}
