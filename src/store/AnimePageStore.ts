import { filterInitialState } from '@constants';
import { makeAutoObservable } from 'mobx';
import { PageFilter } from '@types';

class AnimePageStore {
  filter: PageFilter = filterInitialState;

  constructor() {
    makeAutoObservable(this);
  }

  setInputValue(value: string) {
    this.filter.input = value;
  }
}

export const animePageStore = new AnimePageStore();
