import { action, makeAutoObservable, observable } from 'mobx';

import { requestData } from 'utils/requestData';
import { sseReciver } from 'utils/sseReciver';

import { SessionStoreProps, SessionStatusEnum } from './interfaces';
import EventSource from 'eventsource';
import { TypeUsersEnum, ActionRequestEnum, MethodEnum, DevelopUrlEnum } from 'utils/requestData/interfaces';

class SessionStoreClass {
  // ** id сессии для пользователя */
  sessionId: number | null = null;
  // ** статус сессии await|active|null */
  status: keyof typeof SessionStatusEnum | null = null;
  // ** SSE конструктор */
  eventSource: EventSource | null = null;

  // ** входящее сообщени */
  // TODO убрать any нахуй
  entryMessage: any = null;

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      status: observable,
      eventSource: observable,
      entryMessage: observable,
      setEntryMessageFromSse: action,
    })
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
        // TODO убрать await будет отдаваться с сервера
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
      await requestData({
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
    }
    // ** TODO ошибка если гавно с ID и его нету */
  }

  // ** создание SSE для клиента */
  createServerSubscribeEvents = async () => {
    const url = `${DevelopUrlEnum[TypeUsersEnum.user]}
      ${ActionRequestEnum.userEventSource}
      /sessionCode=${this.sessionId}`;
    this.eventSource = new EventSource(url);
    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  }

  // ** закрытие SSE для клиента */
  closeServerEvents = async () => {
    if (this.eventSource) this.eventSource.close();
  }

  // ** cb переданный в sseReciver для обработки сообщений */
  setEntryMessageFromSse = (msg: any) => {
    // TODO состояние сессии в отдельную переменную data отдельно
    if (this.entryMessage !== msg.data) this.entryMessage = msg.data;
  }
}

const sessionStore: SessionStoreProps = new SessionStoreClass();

export default sessionStore;
