import { RequestDataProps, DevelopUrlEnum, TypeUsersEnum, ActionRequestEnum } from './interfaces';


export const requestData = async (props: RequestDataProps): Promise<any> => {
    const {
        userType,
        requestType,
    } = props;
    try {
        const url = `${DevelopUrlEnum[TypeUsersEnum[userType]]}${ActionRequestEnum[requestType]}`;

        const response = await fetch(url);

        return response;
    }
    catch (error) {
        return error;
    }
}
