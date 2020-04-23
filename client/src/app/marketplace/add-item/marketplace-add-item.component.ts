import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-item',
  templateUrl: './marketplace-add-item.component.html',
  styleUrls: ['./marketplace-add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAddItemComponent implements OnInit {
  control = new FormControl();
  productForm = new FormGroup({});
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
