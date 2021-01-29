import { makeAutoObservable, observable, action } from 'mobx';

import { sseReciver } from 'utils/sseReciver';

import EventSource from 'eventsource';
import {
  TypeUsersEnum,
  ActionOperatorRequestEnum,
  DevelopUrlEnum,
} from 'utils/requestData/interfaces';

class ConnectionStoreClass {
  // ** SSE конструктор для получения сессий в статусе await */
  eventSource: EventSource | null = null;
  // ** входящее сообщение id сессий в статусе await */
  idUserSessionAwaitList: [] | number[] = [];
  // ** id сессии для оператора */
  sessionId: number | null = null;
  // ** входящее сообщение message от пользователя */
  // TODO сука валенок
  entryMessage: any;

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      eventSource: observable,
      idUserSessionAwaitList: observable,
      setEntryMessageFromSse: action,
      createServerSubscribeEvents: action,
      closeServerSubscribeEvents: action
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
  // TODO сука ты знаешь что делать
  setEntryIdUserSessionAwaitList = (msg: any) => {
    console.log('----', msg.data);
    this.idUserSessionAwaitList = JSON.parse(msg.data);
  };

  // ** cb переданный в sseReciver для обработки сообщений */
  // TODO сука ты знаешь что делать
  setEntryMessageFromSse = (msg: any) => {
    this.entryMessage = JSON.parse(msg.data);
  };

  // ** закрытие и очистка текущего SSE получающего id сессий в стутусе await */
  closeServerSubscribeEvents = async() => {
    if (this.eventSource) {
      await this.eventSource.close();
      this.eventSource = null;
    } else {
      console.log('error from closeServerSubscribeEvents: this.eventSource = null');
    }
  }

  // ** подключение оператора к пользователю */
  operatorConnectToUser = async (sessionId: number) => {
    this.sessionId = sessionId;
    const url = `${DevelopUrlEnum[TypeUsersEnum.operator]}${ActionOperatorRequestEnum.connectToUserEventSource}/sessionId=${this.sessionId}`;

    await this.closeServerSubscribeEvents();
    this.idUserSessionAwaitList = [];

    this.eventSource = new EventSource(url);

    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  }
}

const connectionStore = new ConnectionStoreClass();

export default connectionStore;
