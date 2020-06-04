import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ContentLoaderComponent} from "@ngneat/content-loader";

export const CARD_WIDTH = 304;

@Component({
  selector: 'item-card-loader',
  templateUrl: './item-card-loader.component.html',
  styleUrls: ['./item-card-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardLoaderComponent extends ContentLoaderComponent {
  @Input() loaderSize: 'lg' | 'sm' = 'lg';
}
