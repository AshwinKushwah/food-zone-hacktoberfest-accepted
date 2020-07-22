import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm : NgForm;   
  subsription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem:Ingredient;

  // @ViewChild('nameInput', {static:false}) nameInputRef:ElementRef;
  // @ViewChild('ammountInput', {static:false}) amountInputRef:ElementRef;
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();


  constructor(private shoppingListService: ShoppingListService) {

   }

  ngOnInit(): void {
    this.subsription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount : this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy(){
      this.subsription.unsubscribe();

  }

  onAddItems(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  // onAddItems(){
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   //this.ingredientAdded.emit(newIngredient);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
