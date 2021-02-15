import { makeAutoObservable, action } from 'mobx';

import { messageSending } from 'utils/messageSending';

import {
  TypeUsersEnum,
  MessageSendingTypeOperator,
  SetSessionStatus
} from 'utils/messageSending/interfaces';
import { EventStoreProps, SendClickDataProps } from './interfaces';

class EventStoreClass {
  constructor() {
    makeAutoObservable(this, {
      getUserDesktop: action,
      activateSession: action,
      sendClick: action
    });
  }

  /** Изменение статуса сессии для клиента */
  activateSession = (sessionId: number): void => {
    if (sessionId) {
      messageSending({
        sessionId,
        userType: TypeUsersEnum.operator,
        messageType: MessageSendingTypeOperator.activateSession,
        message: {
          status: SetSessionStatus.active,
        },
      });
    } else {
      console.log('has no session id for activateSession');
    }
  };

  /** событие клика */
  sendClick = async (event: MouseEvent, sessionId: number) => {
    if (event) {
      const data: SendClickDataProps = { clientX: event.clientX, clientY: event.clientY };
      if (sessionId) {
        messageSending({
          sessionId,
          userType: TypeUsersEnum.operator,
          messageType: MessageSendingTypeOperator.userClick,
          message: {
            messageToUser: {
              messageType: MessageSendingTypeOperator.userClick,
              data,
            }
          }
        })
      }
    }
  }

  /** Запрос рабочего стола пользователя */
  getUserDesktop = (sessionId: number): void => {
    if (sessionId) {
      messageSending({
        sessionId,
        userType: TypeUsersEnum.operator,
        messageType: MessageSendingTypeOperator.getUserDesktop,
      });
    } else {
      console.log('has no session id for getUserDesktop');
    }
  };
}

const eventStore: EventStoreProps = new EventStoreClass();

export default eventStore;
