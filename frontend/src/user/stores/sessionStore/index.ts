import { action, makeAutoObservable, observable } from 'mobx';

import { requestData } from 'utils/requestData';

import { SessionStoreProps, SessionStatusEnum } from './interfaces';
import { TypeUsersEnum, ActionRequestEnum, MethodEnum, DevelopUrlEnum } from 'utils/requestData/interfaces';

class SessionStoreClass {
  // ** id сессии для пользователя */
  sessionId: number | null = null;
  // ** статус сессии await|active|null */
  status: keyof typeof SessionStatusEnum | null = null;
  // ** SSE конструктор */
  // TODO убрать any нахуй
  eventSource: any = null;

  // ** входящее сообщени */
  // TODO убрать any нахуй
  entryMessage: any = null;

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      status: observable,
      eventSource: observable,
      entryMessage: action,
    });
  }

  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession = async (): Promise<void> => {
    if (this.sessionId === null) {
      const result = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionRequestEnum.getSessionId,
        method: MethodEnum.get,
      });
      // ** успешный ответ записываем переменные и создаем SSE */
      if (result?.sessionId) {
        this.sessionId = result.sessionId;
        this.status = SessionStatusEnum.await;
        this.createServerSubscribeEvents();
      }
      // ** TODO ошибка */
    }
    // ** TODO ошибка если ID есть и залупа */
  }

  // ** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession = async (): Promise<void> => {
    if (this.sessionId) {
      const result = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionRequestEnum.closeSession,
        method: MethodEnum.post,
        data: {
          sessionId: this.sessionId
        }
      });
      // ** очистка store сессии */
      this.sessionId = null;
      this.status = null;
      console.log('pizda', result);
    }
    // ** TODO ошибка если гавно с ID и его нету */
  }

  // ** создание SSE для клиента */
  createServerSubscribeEvents = async () => {
    const url = `${DevelopUrlEnum[TypeUsersEnum.user]}${ActionRequestEnum.userEventSource}`;
    this.eventSource = await new EventSource(url);
    // TODO Нахуй any
  }

  // ** закрытие SSE для клиента */
  closeServerEvents = async () => {
    this.eventSource.close();
  }
}

const sessionStore: SessionStoreProps = new SessionStoreClass();

export default sessionStore;
