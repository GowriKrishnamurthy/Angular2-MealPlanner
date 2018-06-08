import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  
  constructor (private shoppingListService:ShoppingListService){}
  private recipes:Recipe[]=[
    new Recipe(
      'Lemon Tart', 
      'Creamy and dreamy lemon curd filling',
      'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/lemon-tart_A0.jpg?itok=gdqsna43&mtime=1379314018',
      [    
        new Ingredient('Lemon',10),
        new Ingredient('Cream',5),
        new Ingredient('Sugar',15)
      ]),
    new Recipe(
      'Easter Egg', 
      'The Egg in Verjuice',
      'https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/03/28/16/heston-blumenthal-egg-verjuice.jpg?w968h681',
      [    
        new Ingredient('Egg',3),
        new Ingredient('Milk',2),
        new Ingredient('Sugar',5)
      ]),
    new Recipe(
      "Chicken Tikka Masala", 
      "Spicy indian tikka masala gravy",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/27/0/ZA0207H_chicken-in-creamy-tomato-curry-chicken-tikka-masala_s4x3.jpg.rend.hgtvcom.616.462.suffix/1387303023791.jpeg",
      [    
        new Ingredient('Chicken',4),
        new Ingredient('Youghurt',1),
        new Ingredient('Spices',2)
      ]),
    new Recipe(
      "Chicken Vindaloo", 
      "Chicken creamy gravy", 
      "https://2117e.https.cdn.softlayer.net/802117E/www.archanaskitchen.com/images/archanaskitchen/0-Saffola_FitFoodie/1-Chicken_Vindaloo_Recipe_Saffola_Oats_Fit_Foodie-1.jpg",
      [    
        new Ingredient('Chicken',3),
        new Ingredient('Onion',4),
        new Ingredient('Spices',2)
      ]),
      new Recipe(
        'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20)
        ]),
      new Recipe('Big Fat Burger',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1)
        ])
  ];

  getRecipes(){
    // return a new array with the exact copy of recipes array
    // this will avoid acccessing this service's recipe array from outside. only a copy is sent 
    return this.recipes.slice();
  }
  
  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[])
  {
      this.shoppingListService.addIngredients(ingredients);     
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe)  {
    this.recipes[index] =  newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}