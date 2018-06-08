import { Injectable } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  dataHeaders = new Headers({ 'Content-Type': 'application/json' });
  URL = 'https://ng-meal-planner.firebaseio.com/recipes.json';
  constructor(private http: Http,
    private recipeService: RecipeService) { }

  getRecipes() {
    return this.http.get(this.URL)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          if (recipes) {
            recipes.forEach(recipe => {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            });
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }
  storeRecipes() {
    return this.http.put(
      this.URL,
      this.recipeService.getRecipes(),
      { headers: this.dataHeaders }
    );
  }
}
