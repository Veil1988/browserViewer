import { ConnectionStoreProps } from './connectionStore/interfaces';
import { EventsStoreProps } from './eventsStore/interfaces';

export interface StoreProps {
  connectionStore: ConnectionStoreProps;
  eventsStore: EventsStoreProps;
}
