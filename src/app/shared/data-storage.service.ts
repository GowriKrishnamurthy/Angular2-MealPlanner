import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  dataHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  URL = 'https://ng-meal-planner.firebaseio.com/recipes.json';
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>(this.URL,
      {
        observe: 'body',
        responseType: 'json',
        params: new HttpParams().set('auth', token)
      })
      .map(
        (recipes) => {
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
    // return this.httpClient.put(
    //   this.URL + '?auth=' + token,
    //   this.recipeService.getRecipes(),
    //   { headers: this.dataHeaders }
    // );

    const req = new HttpRequest('PUT', this.URL, this.recipeService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
    // params:new HttpParams().set('auth',token)
    // })
  }
}
