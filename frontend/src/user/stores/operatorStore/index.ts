import { makeAutoObservable, observable } from 'mobx';

import { OperatorStoreProps } from './interfaces';

class OperatorStoreClass {
  startTime: Date = new Date();
  currentTime: Date = new Date();
  constructor() {
    makeAutoObservable(this, {
      startTime: observable,
      currentTime: observable,
    });
  }
}

const OperatorStore: OperatorStoreProps = new OperatorStoreClass();

export default OperatorStore;
