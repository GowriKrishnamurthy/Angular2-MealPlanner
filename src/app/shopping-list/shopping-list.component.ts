import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  shoppingListState:Observable<{ingredients:Ingredient[]}>;
  private subscription:Subscription;
  constructor(private shoppingListService:ShoppingListService,
              private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {
    // this.ingredients=this.shoppingListService.getIngredients();
    this.shoppingListState=this.store.select('shoppingList');

    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //      (ingredients:Ingredient[])=> {
    //       this.ingredients=ingredients;
    //      } 
    //   );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onItemSelected(index:number)
  {
    this.shoppingListService.itemSelected.next(index);
  }
}