import { makeAutoObservable, action, observable } from 'mobx';

import { messageSending } from 'utils/messageSending';
import { screenUserDesktop } from 'utils/events/screenUserDesktop';
import { ScreenUserDesktopProps } from 'utils/events/screenUserDesktop/interfaces';
import { TypeUsersEnum, MessageSendingTypeUser } from 'utils/messageSending/interfaces';
import { EventsStoreProps, SendClickDataProps } from './interfaces';

class EventsStoreClass {
  isSending = false;
  constructor() {
    makeAutoObservable(this, {
      isSending: observable,
      sendDesktopToOperator: action,
      sendClick: action
    });
  }

  /** событие клика */
  sendClick = async (event: MouseEvent, sessionId: number) => {
    if (event) {
      const data: SendClickDataProps = { clientX: event.clientX, clientY: event.clientY };
      if (sessionId) {
        messageSending({
          sessionId,
          userType: TypeUsersEnum.user,
          messageType: MessageSendingTypeUser.userClick,
          message: {
            messageToOperator: {
              messageType: MessageSendingTypeUser.userClick,
              data,
            }
          }
        })
      }
    }
  }

  /** отправка рабочего стола оператору */
  sendDesktopToOperator = async (sessionId: number): Promise<void> => {
    if (sessionId && !this.isSending) {
      this.isSending = true;
      const data: ScreenUserDesktopProps = await screenUserDesktop();

      await messageSending({
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

      this.isSending = false;
    }
  };
}

const eventsStore: EventsStoreProps = new EventsStoreClass();

export default eventsStore;
