import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Custom Modules
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { UserModule } from './components/user/user.module';
import { ServiceModule } from './core/services/service.module';
import { GameStoreModule } from './components/game-store/game-store.module';
//Components
import { AppComponent } from './app.component';
//Interceptors
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
//Reducers
import { appReducers } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceModule,
    SharedModule,
    UserModule,
    GameStoreModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
    StoreModule.forRoot(appReducers)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
