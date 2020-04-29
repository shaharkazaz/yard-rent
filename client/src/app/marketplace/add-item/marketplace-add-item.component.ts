import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MarketplaceService} from "../state/marketplace.service";
import {allowedFileTypes, DatoSnackbar} from "@datorama/core";
import {toBase64} from "../../shared/utils";
import {finalize, switchMap, tap} from "rxjs/operators";
import {from, Observable, of} from "rxjs";
import {untilDestroyed} from "ngx-take-until-destroy";
import {Router} from "@angular/router";

@Component({
  selector: 'marketplace-add-item',
  templateUrl: './marketplace-add-item.component.html',
  styleUrls: ['./marketplace-add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAddItemComponent implements OnInit, OnDestroy {
  private readonly ALLOWED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];

  control = new FormControl();
  productForm = this.fb.group({
    image: [null, [Validators.required, allowedFileTypes(this.ALLOWED_FORMATS)]],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    category: [null, [Validators.required]],
    subCategory: [{value: null, disabled: true}, [Validators.required]],
    rewards: [1, [Validators.required]],
    address: ["blabla"]
  });
  imageBase64: string;
  imageSrc$: Observable<string>;
  loading = false;
  categories = [];
  subCategoriesMap = {};
  subCategories = [];

  constructor(private fb: FormBuilder, private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef, private router: Router, private snackbar: DatoSnackbar) { }

  ngOnInit() {
    this.imageSrc$ = this.productForm.get('image').valueChanges.pipe(switchMap(file => file ? from(toBase64(file)) : of('')), tap((base64) => {
      this.imageBase64 = base64;
    }));
    this.productForm.get('category').valueChanges.pipe(untilDestroyed(this)).subscribe(({name}) => {
      this.subCategories = this.subCategoriesMap[name];
      this.productForm.get('subCategory').enable();
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

  submit() {
    this.loading = true;
    this.marketplaceService.addProduct({
      ...this.productForm.value,
      image: this.imageBase64
    }).pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe(() => {
      this.snackbar.success('add-item.successfully-added')
      this.router.navigate(['user/my-products']);
    });
  }

  ngOnDestroy(): void {}

  clearImage() {
    this.productForm.get('image').patchValue(null);
  }
}
