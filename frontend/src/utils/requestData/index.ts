import { RequestDataProps, DevelopUrlEnum, TypeUsersEnum } from './interfaces';

export const requestData = async (props: RequestDataProps): Promise<any> => {
    const {
        userType,
        requestType,
    } = props;
    console.log('props', userType, requestType);
    try {
        const url = DevelopUrlEnum[TypeUsersEnum[userType]];
        console.log('url', url);
        const response = await fetch(url);
        return response;
        // let options
        // const url = TypeUsersEnum.user === userType ? DevelopUrlEnum.user : DevelopUrlEnum.operator;
        // console.log('---', url);
        // const response = await fetch(url, {

        // })
    }
    catch (error) {
        return error
    }
}
