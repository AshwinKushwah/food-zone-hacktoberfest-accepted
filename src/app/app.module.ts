import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    //RecipesModule, 
    //ShoppingListModule,
    SharedModule,
    CoreModule, 
    AuthModule,
  ],
  //providers : [LoggingService],
  // providers: [
  //  ShoppingListService, 
  //  RecipeService ,
  // {
  //   provide : HTTP_INTERCEPTORS , useClass: AuthInterceptorService , multi : true

  // }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
