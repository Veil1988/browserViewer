import { RequestDataProps, DevelopUrlEnum, TypeUsersEnum } from './interfaces';

export const requestData = async (props: RequestDataProps): Promise<any> => {
    const {
        userType,
    } = props;
    console.log('props', props, userType);
    try {
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
