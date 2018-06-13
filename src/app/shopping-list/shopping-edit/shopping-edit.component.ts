import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editemItem: Ingredient;
  @ViewChild('f') editForm: NgForm;

  constructor(private shoppingListService: ShoppingListService,
              private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListService.itemSelected
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editemItem = this.shoppingListService.getIngredient(index);
          this.editForm.setValue({
            name: this.editemItem.name,
            amount: this.editemItem.amount
          });
        });
  }

  onSubmit(newIngredientForm: NgForm) {
    const formVal = newIngredientForm.value;
    const newIngredient = new Ingredient(formVal.name, formVal.amount);
    if (this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    else
    {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.onClear();
  }
  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    // if this.subscription has direct object
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }
}
