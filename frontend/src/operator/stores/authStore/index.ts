import { observable, makeAutoObservable } from 'mobx';

import { AuthStoreProps } from './interfaces';

class AuthStoreClass {
    // ** Логин оператора */
    operatorLogin: string = '';
    // ** Пароль оператора */
    oparatorPassword: string = '';
    // ** статус авторизации оператора */
    isAuthonticadesOperator: boolean = false; 

    constructor() {
        makeAutoObservable(this, {
          operatorLogin: observable,
          oparatorPassword: observable,
          isAuthonticadesOperator: observable,
        })
      }

    // ** обработчик изменения логина и пароля */
    onChangeAuthInputs = (event: Event) => {
        console.log('event', event);
    }
}

const authStore: AuthStoreProps = new AuthStoreClass();

export default authStore;