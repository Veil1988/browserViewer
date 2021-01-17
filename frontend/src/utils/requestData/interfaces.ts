
/** Типы пользователе */
export enum TypeUsersEnum {
    /** Оператор */
    operator = 'operator',
    /** Клиент */
    user = 'user',
}

/** URL для запросов из DEV среды */
export enum DevelopUrlEnum {
    operator = 'http://localhost:9999/operator',
    user = 'http://localhost:9999/user'
}

/** Типы запросов */
export enum ActionRequestEnum {
    /** Запрос ID сессии для клиента */
    getId = 'getId',
}

export interface RequestDataProps {
    userType: keyof typeof TypeUsersEnum,
    requestType: keyof typeof ActionRequestEnum
}