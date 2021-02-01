import authStore from './authStore';
import connectionStore from './connectionStore';
import eventStore from './eventsStore';

import { StoreProps } from './interfaces';

const stores: StoreProps = {
  authStore,
  connectionStore,
  eventStore,
};

export default stores;
