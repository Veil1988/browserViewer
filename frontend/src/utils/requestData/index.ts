import { RequestDataProps, DevelopUrlEnum, TypeUsersEnum, ActionRequestEnum } from './interfaces';
import { header } from './constants';

// ** Шаблон запросов */
export const requestData = async (props: RequestDataProps): Promise<any> => {
    const {
        userType,
        requestType,
        method,
        data = null
    } = props;
    try {
        // ** сборка URL из enum ов тип пользователя и среды разработки */
        const url = `${DevelopUrlEnum[TypeUsersEnum[userType]]}${ActionRequestEnum[requestType]}`;

        const body = data ? {
            body: JSON.stringify(data)
        } : null;

        const responseJSON = await fetch(url, {
            method,
            ...header,
            ...body,
        });

        const response = await responseJSON.json();

        return response;
    }
    catch (error) {
        return error;
    }
}
