import { RequestDataProps, DevelopUrlEnum, TypeUsersEnum } from './interfaces';
import { header } from './constants';

// ** Шаблон запросов */
export const requestData = async (props: RequestDataProps): Promise<void> => {
  const { userType, requestType, method, data = null } = props;
  try {
    // ** сборка URL из enum ов тип пользователя и среды разработки */
    const url = `${DevelopUrlEnum[TypeUsersEnum[userType]]}${requestType}`;

    const body = data
      ? {
          body: JSON.stringify(data),
        }
      : null;

    const responseJSON = await fetch(url, {
      method,
      ...header,
      ...body,
    });

    const response = await responseJSON.json();

    return response;
  } catch (error) {
    return error;
  }
};
