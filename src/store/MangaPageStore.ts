import { filterInitialState } from '@constants';
import { makeAutoObservable } from 'mobx';
import { PageFilter } from '@types';

class MangaPageStore {
  filter: PageFilter = filterInitialState;

  constructor() {
    makeAutoObservable(this);
  }

  setInputValue(value: string) {
    this.filter.input = value;
  }
}

export const mangaPageStore = new MangaPageStore();
