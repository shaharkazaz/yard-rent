import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MarketplaceService} from "../state/marketplace.service";
import {allowedFileTypes, DatoSnackbar} from "@datorama/core";
import {toBase64} from "../../shared/utils";
import {filter, finalize, switchMap} from "rxjs/operators";
import {combineLatest, from, Observable, of} from "rxjs";
import {untilDestroyed} from "ngx-take-until-destroy";
import {ActivatedRoute, Router} from "@angular/router";
import {Category, Product} from "../marketplace.types";

@Component({
  selector: 'marketplace-add-item',
  templateUrl: './marketplace-add-item.component.html',
  styleUrls: ['./marketplace-add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAddItemComponent implements OnInit, OnDestroy {
  private readonly ALLOWED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];
  productForm = this.fb.group({
    image: [null, [Validators.required, allowedFileTypes(this.ALLOWED_FORMATS)]],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    category: [null, [Validators.required]],
    subCategory: [{value: null, disabled: true}, [Validators.required]],
    rewards: [1, [Validators.required]],
    address: ['']
  });
  imageBase64: string;
  loading = false;
  categories = [];
  subCategoriesMap = {};
  subCategories = [];
  originalProduct: Product;

  constructor(private fb: FormBuilder, private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef, private router: Router, private snackbar: DatoSnackbar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initData();
    this.productForm.get('image').valueChanges
      .pipe(filter(file => file && file.name !== 'fake.jpeg'), switchMap(file => file ? from(toBase64(file)) : of('')), untilDestroyed(this)).subscribe((base64) => {
      this.imageBase64 = base64;
      this.cdr.detectChanges();
    });
    this.productForm.get('category').valueChanges.pipe(untilDestroyed(this)).subscribe(({name}) => {
      this.subCategories = this.subCategoriesMap[name];
      this.productForm.get('subCategory').enable();
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (!this.productForm.valid) return;
    this.loading = true;
    const {image, ...product} = this.productForm.value;
    if (!this.originalProduct || this.imageBase64 !== this.originalProduct.image) {
      product.image = this.imageBase64;
    }
    const serverAction = this.originalProduct ? this.marketplaceService.updateProduct(this.originalProduct._id, product) : this.marketplaceService.addProduct(product);
    serverAction.pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe(() => {
      this.snackbar.success(this.originalProduct ? 'edit-item.successfully-updated' : 'add-item.successfully-added');
      this.router.navigate(['user/my-products']);
    });
  }

  ngOnDestroy(): void {}

  clearImage() {
    this.productForm.get('image').patchValue(null);
    this.imageBase64 = null;
  }

  private initData() {
    const serverRequests: Observable<any>[] = [this.marketplaceService.getAllCategories()];
    const productId = this.route.snapshot.params.id;
    if (productId) {
      const getProduct = this.marketplaceService.getProduct(productId);
      serverRequests.push(getProduct);
    }
    combineLatest(serverRequests).subscribe(([categories, product]: [Category[], Product?]) => {
      this.categories = [];
      categories.forEach(({_id, subCategories, name}) => {
        this.categories.push({_id, name});
        this.subCategoriesMap[name] = subCategories;
      });
      if (product) {
        this.originalProduct = product;
        const {image, name, description, rewards, category, subCategory} = product;
        const selectedCategory = this.categories.find(({name}) => name === category.name);
        const selectedSubCategory = this.subCategoriesMap[selectedCategory.name].find(({name}) => name === subCategory.name);
        this.imageBase64 = image;
        this.productForm.patchValue({
          name,
          description,
          rewards,
          category: selectedCategory,
          subCategory: selectedSubCategory
        });
        this.productForm.get('image').patchValue(new File([],'fake.jpeg', {type: "image/jpeg"}), {emitEvent: false});
        Object.values(this.productForm.controls).forEach(control => control.updateValueAndValidity());
      }
    })
  }
}
