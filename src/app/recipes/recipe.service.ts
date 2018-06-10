import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService implements OnInit {
  private recipes: Recipe[] = [];

  ngOnInit(): void {

  }
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    if (recipes) {
      recipes.forEach(recipe => {
        if (!recipes['ingredients']) {
          recipes['ingredients'] = [];
        }
      });
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }
  }

  getRecipes() {
    // return a new array with the exact copy of recipes array
    // this will avoid acccessing this service's recipe array from outside. only a copy is sent 
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}