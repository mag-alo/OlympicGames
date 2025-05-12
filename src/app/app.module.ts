import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    DetailComponent, 
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule, 
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
/**
 * The root module of the Angular application.
 * 
 * The `AppModule` class is decorated with the `@NgModule` decorator, which
 * defines the root module that bootstraps and configures the Angular application.
 * This module typically imports other feature modules, declares components,
 * and provides services that are used throughout the application.
 */
export class AppModule {}
