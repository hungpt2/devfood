import { Component, Input, OnChanges, ViewChild, ElementRef, Inject } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-store';
import { CommonService } from '../services/common.services';

import { Store } from 'redux';
import { AppStore } from '../store/app.store';
import { AppState } from '../store/app.state';
import * as CartActions from '../store/cart.actions';
import { count } from 'rxjs/operators';

@Component({
  selector: 'df-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnChanges {
  @ViewChild("cart") MyProp: ElementRef;
  @Input() showCart;
  listProduct: any = [];
  totalPrice = 0;

  constructor(
    private commonService: CommonService,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  ngOnInit() {
  }

  ngOnChanges($event) {
    if (!$event.showCart.firstChange) {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  readState() {
    this.totalPrice = 0;
    const state: AppState = this.store.getState() as AppState;
    this.listProduct = state.listProduct;
    for (let index = 0; index < this.listProduct.length; index++) {
      const element = this.listProduct[index];
      this.totalPrice += element.price * element.count
    }
  }

  incrementQuantity(index) {
    this.listProduct[index].count += 1
    this.store.dispatch(CartActions.update(this.listProduct));
  }

  decrementQuantity(index) {
    this.listProduct[index].count -= 1
    this.store.dispatch(CartActions.update(this.listProduct));
  }

  deleteFromCart(item) {
    this.commonService.openShowConfirm()
    this.commonService.showConfirmUpdate.subscribe((value) => {
      if (!value) {
        if (this.commonService.getValue()) {
          this.doDeleteProductInCart(item)
        }
      }
    })
  }

  doDeleteProductInCart(item) {
    let index = this.listProduct.indexOf(item);
    if (index > -1) {
      this.listProduct.splice(index, 1);
    }
    this.store.dispatch(CartActions.update(this.listProduct));
  }

  clearAllCartItems() {
    this.store.dispatch(CartActions.initial_cart());
  }

}
