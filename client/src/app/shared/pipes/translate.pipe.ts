import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HashMap } from '@datorama/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(key: string, params?: HashMap): any {
    return this.translocoService.translate(key, params);
  }
}
