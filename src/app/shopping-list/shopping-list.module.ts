import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ShoppingListRoutingModule} from './shopping-list.routing';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations : [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports : [
    FormsModule,
    RouterModule,
    // CommonModule,
    SharedModule,
    ShoppingListRoutingModule,
  ],
  //providers: [LoggingService],
  // exports :[
  //   ShoppingListComponent,
  //   ShoppingEditComponent,
  // ]
  
})
export class ShoppingListModule { }