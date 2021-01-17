import { makeAutoObservable, observable } from 'mobx';

import { requestData } from 'utils/requestData';

import { SessionStoreProps } from './interfaces';
import { TypeUsersEnum, ActionRequestEnum } from 'utils/requestData/interfaces';

class SessionStoreClass {
  id: string | null = null;
  status = null;

  constructor() {
    makeAutoObservable(this, {
      id: observable,
      status: observable,
    });
  }

  // ** запрос id сессии с страници приложения клиента */
  fetchIdSession = async (): Promise<void> => {
    if (this.id === null) {
      const result = await requestData({
        userType: TypeUsersEnum.user,
        requestType: ActionRequestEnum.getId
      });

      console.log('result', result);
    }
  }

  //** закрытие сессии со стороны приложения клиента и самого приложения */
  closeSession = (): void => {
    this.id = null;
    this.status = null;
    console.log('pizda');
  }
}

const sessionStore: SessionStoreProps = new SessionStoreClass();

export default sessionStore;
