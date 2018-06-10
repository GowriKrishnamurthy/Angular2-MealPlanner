import { Injectable } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  dataHeaders = new Headers({ 'Content-Type': 'application/json' });
  URL = 'https://ng-meal-planner.firebaseio.com/recipes.json';
  constructor(private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get(this.URL+'?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          if (recipes) {
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            };
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(
      this.URL+'?auth=' + token,
      this.recipeService.getRecipes(),
      { headers: this.dataHeaders }
    );
  }
}
