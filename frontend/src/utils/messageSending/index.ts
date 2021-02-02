import {
  MessageSendingProps,
  DevelopUrlEnum,
  TypeUsersEnum,
  MethodEnum,
  RequestTypeEnum,
} from './interfaces';
import { header } from './constants';

// ** Шаблон отправки messages при сессии */
export const messageSending = async (props: MessageSendingProps): Promise<any> => {
  const { userType, sessionId, messageType, message = {} } = props;
  try {
    // ** сборка URL из enum ов тип пользователя и среды разработки */
    const url = `${DevelopUrlEnum[TypeUsersEnum[userType]]}${RequestTypeEnum.sessionMessage}`;
    const body = JSON.stringify({
      sessionId,
      messageType,
      message,
    });

    const responseJSON = await fetch(url, {
      ...header,
      method: MethodEnum.post,
      body,
    });

    const response = await responseJSON.json();

    return response;
  } catch (error) {
    return error;
  }
};
