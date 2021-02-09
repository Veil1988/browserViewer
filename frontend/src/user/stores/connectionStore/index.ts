import { action, makeAutoObservable, observable } from 'mobx';
import isEqual from 'lodash.isequal';

import { requestData } from 'utils/requestData';
import { sseReciver } from 'utils/sseReciver';

import { ConnectionStoreProps, SessionStatusEnum } from './interfaces';
import EventSource from 'eventsource';
import {
  TypeUsersEnum,
  ActionUserRequestEnum,
  MethodEnum,
  DevelopUrlEnum,
} from 'utils/requestData/interfaces';
import { MessageProps } from './../../../utils/messageSending/interfaces';

class ConnectionStoreClass {
  // ** id сессии для пользователя */
  sessionId: number | null = null;
  // ** статус сессии await|active|null */
  status: keyof typeof SessionStatusEnum | null = null;
  // ** SSE конструктор */
  eventSource: any = null;
  // ** входящее сообщени */
  entryMessage: MessageProps | {} = {};

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      status: observable,
      eventSource: observable,
      entryMessage: observable,
      setEntryMessageFromSse: action,
    });
  }

  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession = async (): Promise<any> => {
    if (this.sessionId === null) {
      const result: any = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionUserRequestEnum.getSessionId,
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
  };

  // ** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession = async (): Promise<void> => {
    if (this.sessionId) {
      await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionUserRequestEnum.closeSession,
        method: MethodEnum.post,
        data: {
          sessionId: this.sessionId,
        },
      });
      // ** очистка store сессии */
      this.sessionId = null;
      this.status = null;
    }

    // ** закрытие прошлой сессии после перезагрузки */
    const prevSessionId = sessionStorage.getItem('browsingWiever');
    if (!this.sessionId && prevSessionId) {
      await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionUserRequestEnum.closeSession,
        method: MethodEnum.post,
        data: {
          sessionId: Number(prevSessionId),
        },
      });
      // ** Очистка sessionStorage */
      sessionStorage.removeItem('browsingWiever');
    }
    // ** TODO ошибка если гавно с ID и его нету */
  };

  // ** создание SSE для клиента */
  createServerSubscribeEvents = async () => {
    const url = `${DevelopUrlEnum[TypeUsersEnum.user]}${
      ActionUserRequestEnum.userEventSource
    }/sessionId=${this.sessionId}`;
    this.eventSource = new EventSource(url);
    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  };

  // ** закрытие SSE для клиента */
  closeServerEvents = async () => {
    if (this.eventSource) this.eventSource.close();
  };

  // ** cb переданный в sseReciver для обработки сообщений */
  setEntryMessageFromSse = (msg: any) => {
    const parsedMsg = JSON.parse(msg.data);
    if (!isEqual(this.entryMessage, parsedMsg.messageToUser)) {
      this.entryMessage = parsedMsg.messageToUser;
    }
    if (this.status !== parsedMsg.status) {
      this.status = parsedMsg.status;
    }
  };
}

const connectionStore: ConnectionStoreProps = new ConnectionStoreClass();

export default connectionStore;
