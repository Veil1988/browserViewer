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
  // ** входящее сообщени id сессий в статусе await */
  idUserSessionAwaitList: [] | number[] = [];

  constructor() {
    makeAutoObservable(this, {
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
      ActionOperatorRequestEnum.getSessionList
    }`;
    this.eventSource = new EventSource(url);

    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  };

  // ** cb переданный в sseReciver для обработки сообщений */
  // TODO сука ты знаешь что делать
  setEntryMessageFromSse = (msg: any) => {
    this.idUserSessionAwaitList = JSON.parse(msg.data);
  };

  // ** закрытие и очистка текущего SSE получающего id сессий в стутусе await */
  closeServerSubscribeEvents = async() => {
    if (this.eventSource) {
      await this.eventSource.close();
      this.eventSource = null;
    }
  }

  // ** подключение оператора к пользователю */
  operatorConnectToUser = (id: number) => {
    console.log('id', id);
  }
}

const connectionStore = new ConnectionStoreClass();

export default connectionStore;
