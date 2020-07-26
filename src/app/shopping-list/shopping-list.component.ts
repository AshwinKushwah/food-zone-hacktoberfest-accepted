import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients :Ingredient [] = [];
  private subscription : Subscription;


  constructor(private shoppingListService: ShoppingListService, private logggingService : LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientChanged
      .subscribe(
        (ingredients : Ingredient[]) =>{
          this.ingredients = ingredients;
        }
      );
    
      this.logggingService.printLog('Hello from Shopping List Component on ngonInit!');
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

}
