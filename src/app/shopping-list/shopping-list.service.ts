import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredientsChanged= new EventEmitter<Ingredient[]>();
  private ingredients:Ingredient[]=[];
  constructor() {
    }
    getIngredients(){
      return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient){
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
      // ingredients.forEach(element => {
      //   this.ingredients.push(element);        
      // });
      //Add all ingredients to the array in one go!
      this.ingredients.push(...ingredients)
      this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
