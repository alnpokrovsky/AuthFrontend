import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '@components/login/login.component';
import { MaterialModule } from './material.module';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
