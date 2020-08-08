import { Component } from '@angular/core';
import { ContentLoaderComponent } from '@ngneat/content-loader';

@Component({
  selector: 'item-page-loader',
  templateUrl: './item-page-loader.component.html',
  styleUrls: ['./item-page-loader.component.scss']
})
export class ItemPageLoaderComponent extends ContentLoaderComponent {}
