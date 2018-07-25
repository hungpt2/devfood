import { Component, Input, Inject } from '@angular/core';
import { CommonService } from '../../../services/common.services';

import _ from 'lodash';
import { Store } from 'redux';
import { AppStore } from '../../../store/app.store';
import { AppState } from '../../../store/app.state';
import * as CartActions from '../../../store/cart.actions';

@Component({
  selector: 'df-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {

  @Input() value: any;
  listCart: any = [];
  listProduct: any = [];

  constructor(
    private commonService: CommonService,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  ngOnInit() {
    this.listProduct = _.cloneDeep(this.value)
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;
    this.listCart = state.listProduct;
    if (this.value) {
      this.listProduct = _.cloneDeep(this.value)
      for (let index = 0; index < this.listProduct.value.length; index++) {
        const element = this.listProduct.value[index];
        for (let j = 0; j < this.listCart.length; j++) {
          const element2 = this.listCart[j];
          if (element2.id === element.id) {
            this.listProduct.value[index] = element2
          }
        }
      }
    }
  }

  addToCart(item) {
    let flag = true
    for (let index = 0; index < this.listCart.length; index++) {
      const element = this.listCart[index];
      if (element.id === item.id) {
        flag = false
        this.listCart[index].count += 1
        this.store.dispatch(CartActions.update(this.listCart));
        break
      }
    }
    if (flag) {
      let data = Object.assign({}, item)
      data['count'] = 1
      this.store.dispatch(CartActions.add_to_cart(data));
    }
  }

  incrementQuantity(id) {
    for (let index = 0; index < this.listCart.length; index++) {
      const element = this.listCart[index];
      if (element.id === id) {
        this.listCart[index].count += 1;
        this.store.dispatch(CartActions.update(this.listCart));
      }
    }
  }

  decrementQuantity(id) {
    for (let index = 0; index < this.listCart.length; index++) {
      const element = this.listCart[index];
      if (element.id === id) {
        if (this.listCart[index].count === 1) {
          this.listCart.splice(index, 1);
        } else {
          this.listCart[index].count -= 1;
        }
        this.store.dispatch(CartActions.update(this.listCart));
      }
    }
  }

}
