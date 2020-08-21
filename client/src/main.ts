import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { LicenseManager } from 'ag-grid-enterprise';

import { AppModule } from '@yr/app.module';

import { environment } from './environments/environment';

/* Enable AG-grid enterprise, since we don't have a license it prints an error */
LicenseManager.setLicenseKey('');

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState({ key: 'shopping-cart', include: ['shoppingCart'] });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
