import { makeAutoObservable, action } from 'mobx';

import { messageSending } from 'utils/messageSending';
import { screenUserDesktop } from 'utils/events/screenUserDesktop';
import { TypeUsersEnum, MessageSendingTypeUser } from 'utils/messageSending/interfaces';
import { EventsStoreProps } from './interfaces';

class EventsStoreClass {
  constructor() {
    makeAutoObservable(this, {
      sendDesktopToOperator: action,
    });
  }

  /** отправка рабочего стола оператору */
  sendDesktopToOperator = async (sessionId: number): Promise<void> => {
    if (sessionId) {
      const data = await screenUserDesktop();

      messageSending({
        sessionId,
        userType: TypeUsersEnum.user,
        messageType: MessageSendingTypeUser.userDesktop,
        message: {
          messageToOperator: {
            messageType: MessageSendingTypeUser.userDesktop,
            data,
          },
        },
      });
    }
  };
}

const eventsStore: EventsStoreProps = new EventsStoreClass();

export default eventsStore;
