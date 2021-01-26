import { makeAutoObservable, observable } from 'mobx';

import { sseReciver } from 'utils/sseReciver';

import EventSource from 'eventsource';
import { TypeUsersEnum, ActionOperatorRequestEnum, DevelopUrlEnum } from 'utils/requestData/interfaces';

class ConnectionStoreClass {
  // ** SSE конструктор для получения сессий в статусе await */
  eventSource: EventSource | null = null;
  // ** входящее сообщени */
  // TODO убрать any нахуй
  entryMessage: any = null;

  constructor() {
    makeAutoObservable(this, {
      eventSource: observable,
      entryMessage: observable,
    })
  }

  // ** создание SSE для получений id сессий в статусе await */
  createServerSubscribeEvents = async () => {
    const url = `${DevelopUrlEnum[TypeUsersEnum.operator]}${ActionOperatorRequestEnum.getSessionList}`;
    this.eventSource = new EventSource(url);

    sseReciver({
      eventSource: this.eventSource,
      cbMessage: this.setEntryMessageFromSse,
    });
  }

  // ** cb переданный в sseReciver для обработки сообщений */
  setEntryMessageFromSse = (msg: any) => {
    if (this.entryMessage !== msg.data) this.entryMessage = msg.data;
  }
}

const connectionStore = new ConnectionStoreClass();

export default connectionStore;