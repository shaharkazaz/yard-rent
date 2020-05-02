import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {untilDestroyed} from "ngx-take-until-destroy";
import {MarketplaceService} from "../state/marketplace.service";

@Component({
  selector: 'marketplace-filters',
  templateUrl: './marketplace-filters.component.html',
  styleUrls: ['./marketplace-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceFiltersComponent implements OnInit, OnDestroy {
  filterForm = this.fb.group({
    text: [],
    category: [],
    subCategory: [],
    minRewards: [],
    maxRewards: [],
  });

  categories = [];
  subCategoriesMap = {};
  subCategories = [];
  @Output() filterChanged = new EventEmitter();

  constructor(private fb: FormBuilder, private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.filterForm.get('category').valueChanges.pipe(untilDestroyed(this)).subscribe(({name}) => {
      this.subCategories = this.subCategoriesMap[name];
      this.filterForm.get('subCategory').enable();
      this.filterForm.get('subCategory').reset();
      this.cdr.detectChanges();
    });
    this.marketplaceService.getAllCategories().subscribe((categories) => {
      this.categories = [];
      categories.forEach(({_id, subCategories, name}) => {
        this.categories.push({_id, name});
        this.subCategoriesMap[name] = subCategories;
      });
    });
  }

  apply() {
    this.filterChanged.emit(this.filterForm.value);
  }

  clear() {
    this.filterChanged.emit(null);
  }

  ngOnDestroy(): void {}
}
