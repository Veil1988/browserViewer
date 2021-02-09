/** Типы пользователе */
export enum TypeUsersEnum {
  /** Оператор */
  operator = 'operator',
  /** Клиент */
  user = 'user',
}

/** URL для запросов из DEV среды */
export enum DevelopUrlEnum {
  operator = 'http://localhost:9999/operator/',
  user = 'http://localhost:9999/user/',
}

/** Методы запросов */
export enum MethodEnum {
  post = 'POST',
  get = 'GET',
}

/** Типы запросов оператора */
export enum ActionOperatorRequestEnum {
  /** Авторизация оператора */
  auth = 'auth',
  /** Получение id сессий в статусе await */
  getSessionListEventSource = 'getSessionListEventSource',
  /** Подключение к клиенту */
  connectToUserEventSource = 'connectToUserEventSource',
  /** Закрытие сессии */
  closeSession = 'closeSession',
}

/** Типы запросов пользователя */
export enum ActionUserRequestEnum {
  /** Запрос ID сессии для клиента */
  getSessionId = 'getSessionId',
  /** Закрытие сессии */
  closeSession = 'closeSession',
  /** Подписка на события */
  userEventSource = 'userEventSource',
}

/** Тело запроса на закрытие сессии */
export interface CloseSessionBody {
  sessionId: number;
}

/** Тело запроса авторизации оператора */
export interface AuthOperator {
  password: string;
  login: string;
}

/** Типизирование всех возможных тел запроса */
export interface RequestDataBodyProps {
  data?: CloseSessionBody | AuthOperator | null;
}

/** Типизация входящих параметров в RequestData */
export interface RequestDataProps extends RequestDataBodyProps {
  userType: keyof typeof TypeUsersEnum;
  requestType: keyof typeof ActionUserRequestEnum | keyof typeof ActionOperatorRequestEnum;
  method: MethodEnum.get | MethodEnum.post;
}
