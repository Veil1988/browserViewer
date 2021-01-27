import { observable, makeAutoObservable } from 'mobx';

import { requestData } from 'utils/requestData';

import { AuthStoreProps } from './interfaces';

import { TypeUsersEnum, ActionOperatorRequestEnum, MethodEnum } from 'utils/requestData/interfaces';

class AuthStoreClass {
  // ** Логин оператора */
  operatorLogin: string = '';
  // ** Пароль оператора */
  operatorPassword: string = '';
  // ** статус авторизации оператора */
  isAuthonticadesOperator: boolean = false;
  // ** Статус Авторизации */
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      operatorLogin: observable,
      operatorPassword: observable,
      isAuthonticadesOperator: observable,
    });
  }

  // ** обработчик изменения логина и пароля */
  // TODO сам знаешь в чем проблема
  onInputAuth = (event: any) => {
    console.log('suka', event.target.id);
    if (event.target.id === 'browserViewer-authLogin') {
      this.operatorLogin = event.target.value || '';
    }
    if (event.target.id === 'browserViewer-authPassword') {
      this.operatorPassword = event.target.value || '';
    }
  };

  // ** аторизация пользователя */
  handleAuth = async () => {
    this.isLoading = true;

    const result = await requestData({
      userType: TypeUsersEnum.operator,
      requestType: ActionOperatorRequestEnum.auth,
      method: MethodEnum.post,
      data: {
        login: this.operatorLogin,
        password: this.operatorPassword,
      },
    });

    this.isLoading = false;
    if (result?.isAuthonticadesOperator) {
      this.isAuthonticadesOperator = result.isAuthonticadesOperator;
    }
  };
}

const authStore: AuthStoreProps = new AuthStoreClass();

export default authStore;
