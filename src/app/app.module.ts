import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_DATE_LOCALE, NZ_I18N, NzI18nModule, provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from "./shared/shared.module";
import { PageComponent } from "./layouts/page-layout/page/page.component";
import { AuthComponent } from "./layouts/auth-layout/auth/auth.component";
import { HttpRequestInterceptor } from "./shared/interceptors/http-request.inperceptor";
import { NzInputModule } from 'ng-zorro-antd/input';
import customViVn from './custom-vi-vn';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AuthComponent,
    // ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    ReactiveFormsModule,
    NzI18nModule,
    NzInputModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpBackend) => {
          return new TranslateHttpLoader(new HttpClient(http));
        },
        deps: [HttpBackend]
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: customViVn },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    // { provide: NZ_DATE_LOCALE, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
