import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
