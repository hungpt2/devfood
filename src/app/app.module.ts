import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { WaveModule } from './shared/wave/wave.module';
import { SpinnerComponent } from './shared/spinner.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NavigationComponent } from './layouts/header-navigation/navigation.component';
import { NotFoundComponent } from './layouts/error/404/not-found.component';
import { CartComponent } from './cart/cart.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { AppRoutingModule } from './app-routing.module';
import { RestaurantComponent } from './layouts/header-navigation/restaurant/restaurant.component';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.services';
import { FirestoreService } from './services/firestore.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { WebStorageModule } from 'ngx-store';

import { appStoreProviders } from './store/app.store';
import { ConfirmComponent } from './confirm/confirm.component';

// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreModule } from '@ngrx/store';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    SpinnerComponent,
    NavigationComponent,
    FullComponent,
    NotFoundComponent,
    BlankComponent,
    CartComponent,
    AppComponent,
    RestaurantComponent,
    ConfirmComponent
  ],
  imports: [
    Ng2PageScrollModule,
    WaveModule,
    WebStorageModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    // StoreModule.forRoot({ 
    //   cart
    // }),
    // StoreDevtoolsModule.instrument()
  ],
  providers: [
    FirestoreService,
    AngularFireAuth,
    CommonService,
    appStoreProviders,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
