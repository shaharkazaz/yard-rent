import { Injectable } from '@angular/core';
import { IconRegistry } from '@datorama/core';
import { finalize } from 'rxjs/operators';

import { inStorage } from './auth/state/auth.query';
import { AuthService } from './auth/state/auth.service';
import * as icons from './my-icons';

@Injectable()
export class AppInitService {
  constructor(
    private iconRegistry: IconRegistry,
    private authService: AuthService
  ) {}

  private hasInit = false;

  appInitiated() {
    return this.hasInit;
  }

  init() {
    return new Promise(resolve => {
      // add all svgs to the registry
      const iconMap = Object.values(icons).reduce((map, { name, data }) => {
        map[name] = data;
        return map;
      }, {});
      this.iconRegistry.register(iconMap);
      if (inStorage()) {
        this.authService
          .getUserByToken()
          .pipe(
            finalize(() => {
              this.hasInit = true;
              resolve();
            })
          )
          .subscribe(user => {
            this.authService.updateStoreFromUser(user);
          });
      } else {
        this.hasInit = true;
        resolve();
      }
    });
  }
}
