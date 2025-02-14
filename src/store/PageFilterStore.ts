import { filterInitialState } from '@constants';
import { makeAutoObservable } from 'mobx';
import { PageFilter } from '@types';

class PageFilterStore {
  homeFilter: PageFilter = filterInitialState;
  animeFilter: PageFilter = filterInitialState;
  mangaFilter: PageFilter = filterInitialState;

  constructor() {
    makeAutoObservable(this);
  }

  setInputValue(filter: PageFilter, value: string) {
    filter.inputValue = value;
  }
}

export const pageFilterStore = new PageFilterStore();
