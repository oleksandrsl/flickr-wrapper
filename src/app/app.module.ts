import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';

import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { ImageSearchComponent } from './image-search/image-search.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ImageSearchService } from './image-search.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ImageSearchComponent,
    SearchBoxComponent,
    SearchResultComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  },
  {
    provide: LOCALE_ID,
    useValue: 'Uk'
  },
  {
    provide:ImageSearchService,
    useClass: ImageSearchService
  }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
