import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  shoppingListState:Observable<{ingredients:Ingredient[]}>;
  constructor(private shoppingListService:ShoppingListService,
              private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState=this.store.select('shoppingList');
  }

  onItemSelected(index:number)
  {
    this.shoppingListService.itemSelected.next(index);
  }
}