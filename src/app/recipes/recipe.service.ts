import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipeSelected=new EventEmitter<Recipe>();

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
      ])
  ];

  getRecipes(){
    // return a new array with the exact copy of recipes array
    // this will avoid acccessing this service's recipe array from outside. only a copy is sent 
    return this.recipes.slice();
  }
}