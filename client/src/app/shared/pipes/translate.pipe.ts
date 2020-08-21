import { Pipe, PipeTransform } from '@angular/core';
import { HashMap } from '@datorama/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(key: string, params?: HashMap): any {
    return this.translocoService.translate(key, params);
  }
}
