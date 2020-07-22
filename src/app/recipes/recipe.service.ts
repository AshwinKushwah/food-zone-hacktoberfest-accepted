import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Banana Shake', 
  //     'This is simply a test', 
  //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
  //     [ 
  //       new Ingredient('Banana', 2),
  //       new Ingredient('Milk' , 20)
  //     ]),
  //   new Recipe(
  //     'Big Fat Burger', 
  //     'This is simply a test', 
  //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat' , 1)
  //     ]),

  // ];

  private recipes : Recipe[] = [];

  constructor(private shoppingListService : ShoppingListService) {}

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    //return this.recipes; // It will return reference and it can be changed from outside
    return this.recipes.slice() // It will return exact copy of the same array.
  }

  getRecipe(index:number){

    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[] ){

    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number, newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}