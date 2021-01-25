import { AuthStoreProps } from './authStore/interfaces';
import { ConnectionStoreProps } from './connectionStore/interfaces';

export interface StoreProps {
    authStore: AuthStoreProps,
    connectionStore: ConnectionStoreProps
}