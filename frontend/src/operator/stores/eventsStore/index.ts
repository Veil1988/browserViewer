import { makeAutoObservable, action } from 'mobx';

import { messageSending } from 'utils/messageSending';

import {
  TypeUsersEnum,
  MessageSendingTypeOperator,
  SetSessionStatus,
} from 'utils/messageSending/interfaces';
import { EventStoreProps } from './interfaces';

class EventStoreClass {
  constructor() {
    makeAutoObservable(this, {
      getUserDesktop: action,
      activateSession: action,
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

  /** Отправка сообщения пользователю */
  sendVoiceMessage = (props: any): void => {
    const { userType, sessionId, data } = props;
    if (sessionId && userType && data) {
      messageSending({
        sessionId,
        userType,
        messageType: MessageSendingTypeOperator.voiceEvent,
        message: {
          messageToOperator: {
            messageType: MessageSendingTypeOperator.voiceEvent,
            data,
          },
        },
      });
    } else {
      console.log('has no session id for sendVoiceMessage');
    }
  };
}

const eventStore: EventStoreProps = new EventStoreClass();

export default eventStore;
