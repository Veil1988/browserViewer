import { makeAutoObservable, observable } from 'mobx';

import { requestData } from 'utils/requestData';

import { SessionStoreProps, SessionStatusEnum } from './interfaces';
import { TypeUsersEnum, ActionRequestEnum, MethodEnum } from 'utils/requestData/interfaces';

class SessionStoreClass {
  // ** id сессии для пользователя */
  sessionId: number | null = null;
  // ** статус сессии await|active|null */
  status: keyof typeof SessionStatusEnum | null = null;

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      status: observable,
    });
  }

  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession = async (): Promise<void> => {
    if (this.sessionId === null) {
      const result = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionRequestEnum.getSessionId,
        method: MethodEnum.get,
      });
      // ** успешный ответ */
      if (result?.sessionId) {
        this.sessionId = result.sessionId;
        this.status = SessionStatusEnum.await;
      }
      // ** TODO ошибка */
    }
    // ** TODO ошибка если ID есть и залупа */
  }

  // ** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession = async (): Promise<void> => {
    if (this.sessionId) {
      const result = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionRequestEnum.closeSession,
        method: MethodEnum.post,
        data: {
          sessionId: this.sessionId
        }
      });
      // ** очистка store сессии */
      this.sessionId = null;
      this.status = null;
      console.log('pizda', result);
    }
    // ** TODO ошибка если гавно с ID и его нету */
  }
}

const sessionStore: SessionStoreProps = new SessionStoreClass();

export default sessionStore;
