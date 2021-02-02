/** Типы пользователе */
export enum TypeUsersEnum {
  /** Оператор */
  operator = 'operator',
  /** Клиент */
  user = 'user',
}

/** тип изменения статуса на клиенте */
export enum SetSessionStatus {
  active = 'active',
}

/** URL для запросов из DEV среды */
export enum DevelopUrlEnum {
  operator = 'http://localhost:9999/operator/',
  user = 'http://localhost:9999/user/',
}

/** Методы запросов */
export enum MethodEnum {
  post = 'POST',
}

export enum RequestTypeEnum {
  sessionMessage = 'sessionMessage',
}

/** Типы событий для отправки */
export enum MessageSendingTypeUser {
  /** Клик по рабочему месту с стороны оператора/клиента */
  mouseEvent = 'mouseEvent',
  /** Отправка голосового сообщения с стороный оператора/клиента */
  voiceEvent = 'voiceEvent',
  /** Отправка скрола с стороны только клиента */
  scrollEvent = 'scrollEvent',
  /** Отправка рабочего стола */
  userDesktop = 'userDesktop',
}

export enum MessageSendingTypeOperator {
  /** Визуал рабочего места клиента */
  getUserDesktop = 'getUserDesktop',
  /** Клик по рабочему месту с стороны оператора/клиента */
  mouseEvent = 'mouseEvent',
  /** Отправка голосового сообщения с стороный оператора/клиента */
  voiceEvent = 'voiceEvent',
  /** Отправка статуса сессии необходимо только для оператора */
  activateSession = 'activateSession',
}

/** Типизация входящих параметров в RequestData */
export interface MessageSendingProps {
  userType: keyof typeof TypeUsersEnum;
  sessionId: number;
  messageType: keyof typeof MessageSendingTypeUser | keyof typeof MessageSendingTypeOperator;
  message?: MessageProps;
}

export interface EmptyMessage {
  message: {};
}

export interface StatusMessage {
  status: keyof typeof SetSessionStatus;
}

export interface DesktopMessage {
  messageToOperator: {
    messageType: MessageSendingTypeUser.userDesktop;
    data: {
      imgScreen: string;
      userDesktopData: {
        desktopHeight: number;
        desktopScollLeft: number;
        desktopScrollTop: number;
        desktopWidth: number;
      };
    };
  };
}

export interface VoiceMessage {
  [x: string]: {
    messageType: MessageSendingTypeUser.voiceEvent;
    data: string;
  };
}

export interface MessageProps {
  message: EmptyMessage | StatusMessage | DesktopMessage | VoiceMessage;
}
