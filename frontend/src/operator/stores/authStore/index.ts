import { observable, makeAutoObservable } from 'mobx';

import { requestData } from 'utils/requestData';

import { AuthStoreProps } from './interfaces';

import { TypeUsersEnum, ActionOperatorEnum, MethodEnum } from 'utils/requestData/interfaces';

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
        })
      }

    // ** обработчик изменения логина и пароля */
    // TODO сам знаешь в чем проблема
    onInputAuth = (event: any) => {
      if (event.target.id === 'authLogin') {
        this.operatorLogin = event.target.value || '';
      }
      if (event.target.id === 'authPassword') {
        this.operatorPassword = event.target.value || '';
      }
    }

    // ** аторизация пользователя */
    handleAuth = async () => {
      this.isLoading = true;

      const result = await requestData({
        userType: TypeUsersEnum.operator,
        requestType: ActionOperatorEnum.auth,
        method: MethodEnum.post,
        data: {
          login: this.operatorLogin,
          password: this.operatorPassword
        }
      })

      this.isLoading = false;
      if (result?.isAuthonticadesOperator) {
        this.isAuthonticadesOperator = result.isAuthonticadesOperator
      }
    }
}

const authStore: AuthStoreProps = new AuthStoreClass();

export default authStore;