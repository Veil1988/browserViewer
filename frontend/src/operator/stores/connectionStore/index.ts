import { makeAutoObservable, observable, action } from 'mobx';
import { requestData } from 'utils/requestData';
import { ConnectionStoreProps, SessionStatusEnum } from './interfaces';
import isEqual from 'lodash.isequal';

import { sseReciver } from 'utils/sseReciver';

import EventSource from 'eventsource';
import {
  TypeUsersEnum,
  ActionOperatorRequestEnum,
  DevelopUrlEnum,
  MethodEnum
} from 'utils/requestData/interfaces';
import { MessageProps } from './../../../utils/messageSending/interfaces';

class ConnectionStoreClass {
  // ** статус сессии */
  status: keyof typeof SessionStatusEnum | null = null;
  // ** SSE конструктор для получения сессий в статусе await */
  eventSource: EventSource | null = null;
  // ** входящее сообщение id сессий в статусе await */
  idUserSessionAwaitList: [] | number[] = [];
  // ** id сессии для оператора */
  sessionId: number | null = null;
  // ** входящее сообщение message от пользователя */
  entryMessage: MessageProps | {} = {};

  constructor() {
    makeAutoObservable(this, {
      status: observable,
      entryMessage: observable,
      sessionId: observable,
      eventSource: observable,
      idUserSessionAwaitList: observable,
      setEntryMessageFromSse: action,
      createServerSubscribeEvents: action,
      closeServerSubscribeEvents: action,
    });
  }

  // ** создание SSE для получений id сессий в статусе await */
  createServerSubscribeEvents = async () => {
    const url = `${DevelopUrlEnum[TypeUsersEnum.operator]}${
      ActionOperatorRequestEnum.getSessionListEventSource
    }`;
    this.eventSource = new EventSource(url);

    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryIdUserSessionAwaitList,
    });
  };

  // ** cb переданный в sseReciver для обработки сообщений */
  setEntryIdUserSessionAwaitList = (msg: any) => {
    this.idUserSessionAwaitList = JSON.parse(msg.data);
  };

  // ** cb переданный в sseReciver для обработки сообщений */
  setEntryMessageFromSse = (msg: any) => {
    const parsedMsg = JSON.parse(msg.data);
    if (!isEqual(this.entryMessage, parsedMsg.messageToOperator)) {
      this.entryMessage = parsedMsg.messageToOperator;
    }
    if (this.status !== parsedMsg.status) {
      // ** обработчик на закрытие сессии со стороны клиента */
      if (parsedMsg.status === SessionStatusEnum.close) {
        this.closeServerSubscribeEvents();
        this.entryMessage = {};
        this.eventSource = null;
        this.status = null;
        this.sessionId = null;
      } else {
        this.status = parsedMsg.status;
      }
    }
  };

  // ** закрытие и очистка текущего SSE получающего id сессий в стутусе await */
  closeServerSubscribeEvents = async () => {
    if (this.eventSource) {
      await this.eventSource.close();
      this.eventSource = null;
    } else {
      console.log('error from closeServerSubscribeEvents: this.eventSource = null');
    }
  };

  closeSession = async (): Promise<void> => {
    if (this.sessionId) {
      await requestData({
        userType: TypeUsersEnum.operator,
        requestType: ActionOperatorRequestEnum.closeSession,
        method: MethodEnum.post,
        data: {
          sessionId: this.sessionId,
        },
      });
      // ** очистка store сессии */
      await sessionStorage.removeItem('browsingWiever');
      this.sessionId = null;
      this.status = null;
      return
    }

    // ** закрытие прошлой сессии после перезагрузки */
    const prevSessionId: string | null = sessionStorage.getItem('browsingWiever');
    if (!this.sessionId && prevSessionId?.length) {
      await requestData({
        userType: TypeUsersEnum.operator,
        requestType: ActionOperatorRequestEnum.closeSession,
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

  // ** подключение оператора к пользователю */
  operatorConnectToUser = async (sessionId: number) => {
    this.sessionId = sessionId;
    const url = `${DevelopUrlEnum[TypeUsersEnum.operator]}${
      ActionOperatorRequestEnum.connectToUserEventSource
    }/sessionId=${this.sessionId}`;

    await this.closeServerSubscribeEvents();
    this.idUserSessionAwaitList = [];

    this.eventSource = new EventSource(url);

    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  };
}

const connectionStore: ConnectionStoreProps = new ConnectionStoreClass();

export default connectionStore;
