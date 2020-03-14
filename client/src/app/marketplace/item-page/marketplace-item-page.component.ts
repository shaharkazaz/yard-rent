import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseUrl } from '../../shared/utils';
import { image64base } from './image-upload-test';

@Component({
  selector: 'marketplace-item-page',
  templateUrl: './marketplace-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-page.component.scss']
})
export class MarketplaceItemPageComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .post(parseUrl('products'), {
        user: '5e230ed64610ac3b844767ce',
        name: 'chen amiel',
        category: '5e5a8f8ef995f966609e7715',
        subCategory: '5e5a91f684d88c10c41b2f3c',
        rewards: 3214532,
        address: 'Mendel 5ewqe',
        deposit: 3,
        durationInDays: '98637051',
        description: 'jasifajfioasjhaoijiofjaiofjafoafjasijaofa',
        image: image64base
      })
      .subscribe(data => {
        debugger;
      });
  }
}
