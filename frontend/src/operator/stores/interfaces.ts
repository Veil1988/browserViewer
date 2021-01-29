import { AuthStoreProps } from './authStore/interfaces';
import { ConnectionStoreProps } from './connectionStore/interfaces';
import { EventStoreProps } from './eventsStore/interfaces';

export interface StoreProps {
  authStore: AuthStoreProps;
  connectionStore: ConnectionStoreProps;
  eventStore: EventStoreProps;
}
