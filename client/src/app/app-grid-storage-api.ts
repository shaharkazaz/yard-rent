import { DatoGridSettings, GridStorageAPI } from '@datorama/core';
import { of } from 'rxjs';

export const gridStorageAPI: GridStorageAPI = {
  get: (gridName: string) => {
    return of(JSON.parse(localStorage.getItem(gridName) || '{}'));
  },
  set: (gridName: string, state: Partial<DatoGridSettings>) => {
    localStorage.setItem(gridName, JSON.stringify(state));
  }
};
