import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {ActivatedRoute, Router} from '@angular/router';
import {AppAuthService} from "../../auth/app-auth.service";
import {User} from "../../auth/state/auth.model";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {allowedFileTypes} from "@datorama/core";
import {finalize, switchMap} from "rxjs/operators";
import {combineLatest, from, Observable, of} from "rxjs";
import {toBase64} from "../../shared/utils";
import {untilDestroyed} from "ngx-take-until-destroy";
import {Category, Product} from "../../marketplace/marketplace.types";
import {AuthService} from "../../auth/state/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private readonly ALLOWED_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];
  user: User;
  loading = false;
  imageBase64: string;
  userForm = this.fb.group({
    image: [null, [Validators.required, allowedFileTypes(this.ALLOWED_FORMATS)]]
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authQuery: AuthQuery,
    private appAuthService: AppAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authQuery.getValue().user;
    this.userForm.get('image').valueChanges
      .pipe(switchMap(file => file ? from(toBase64(file)) : of('')), untilDestroyed(this)).subscribe((base64) => {
      this.imageBase64 = base64;
      this.cdr.detectChanges();
    });
  }

  submit() {
    this.loading = true;
    const {image} = this.userForm.value;
    if (this.imageBase64 !== this.user.image) {
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


  logout() {
    this.appAuthService.logout();
  }


  private initData() {
    const serverRequests: Observable<any>[] = [this.user.getAllCategories()];
    const userId = this.route.snapshot.params.id;
    if (userId) {
      const getUser = this.authService.getUserByToken();
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
        this.productForm.get('image').patchValue(new File([],''), {emitEvent: false})
      }
    })
  }
}
