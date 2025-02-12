import { animeFilterInitialState } from '@constants';
import { makeAutoObservable } from 'mobx';
import { AnimeFilter } from '@types';

class AnimePageStore {
  filter: AnimeFilter = animeFilterInitialState;

  constructor() {
    makeAutoObservable(this);
  }

  //   setNextPage() {
  //     this.filter.page++;
  //   }

  //   setFirstPage() {
  //     this.filter.page = 1;
  //   }

  setInputValue(value: string) {
    this.filter.input = value;
  }
}

export const animePageStore = new AnimePageStore();
