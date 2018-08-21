import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';

//Custom Modules
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { ServiceModule } from './core/services/service.module';
//Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
//Interceptors
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { CachingInterceptor } from './core/interceptors/caching.interceptor';
//Reducers
import { appReducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,

    ServiceModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
    StoreModule.forRoot(appReducers),
    NgxPaginationModule,
    AppRoutingModule
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
    },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
