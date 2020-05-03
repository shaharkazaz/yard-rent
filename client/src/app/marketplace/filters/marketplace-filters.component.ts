import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {untilDestroyed} from "ngx-take-until-destroy";
import {MarketplaceService} from "../state/marketplace.service";
import {deepEqual} from "@datorama/core";
import {ActivatedRoute, Router} from "@angular/router";

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
  previousFilter;

  constructor(private fb: FormBuilder, private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const predefined = this.route.snapshot.queryParams;
    if (predefined) {
      this.filterForm.patchValue(predefined);
    }
    this.filterForm.get('category').valueChanges.pipe(untilDestroyed(this)).subscribe((category) => {
      this.filterForm.get('subCategory').reset();
      this.subCategories = category ? this.subCategoriesMap[category.name] : [];
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
    if (!deepEqual(this.previousFilter, this.filterForm.value) && this.hasValues) {
    const filledValues = {};
    for (const control in this.filterForm.value) {
      const controlValue = this.filterForm.value[control];
      if (!!controlValue) {
        let value = controlValue;
        if (/category|subCategory/.test(control)) {
          value = controlValue.name
        }
        filledValues[control] = value;
      }
    }
      this.previousFilter = this.filterForm.value;
      this.router.navigate([], {relativeTo: this.route, queryParams: filledValues});
    }
  }

  clear() {
    this.previousFilter = null;
    this.filterForm.reset();
    this.router.navigate([], {relativeTo: this.route, queryParams: {}});
  }

  ngOnDestroy(): void {}

  get hasValues() {
    return Object.values(this.filterForm.value).some(v => !!v);
  }
}
