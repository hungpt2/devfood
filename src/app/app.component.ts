import { Component, Inject } from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';

import { Store } from 'redux';
import { AppStore } from './store/app.store';
import { AppState } from './store/app.state';
import * as CartActions from './store/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @LocalStorage('restaID') restaID: string = '';
  @LocalStorage('userDetail') userDetail: any = '';
  title = 'app';

  constructor(
    private auth: AuthService,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    PageScrollConfig.defaultScrollOffset = 150;
    PageScrollConfig.defaultDuration = 500;
    this.setInitialCart();
  }

  ngOnInit() {
    if (this.userDetail === '' || this.restaID === '') {
      this.auth.emailLogin(environment.email, environment.pwd).then(res => {
        this.auth.authResolver().then(res2 => {
        })
      })
    }
  }

  setInitialCart () {
    this.store.dispatch(CartActions.initial_cart());
  }
}
