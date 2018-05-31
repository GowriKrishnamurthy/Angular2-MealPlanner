import { EventEmitter,Output,Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  @Output('recipeItemSelected') recipeItemSelected=new EventEmitter<Recipe>();
  recipes:Recipe[]=[];
  constructor() { }

  ngOnInit() {
    this.recipes.push(new Recipe('Lemon Tart', 'Creamy and dreamy lemon curd filling','https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/lemon-tart_A0.jpg?itok=gdqsna43&mtime=1379314018'));
    this.recipes.push(new Recipe('Easter Egg', 'The Egg in Verjuice','https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/03/28/16/heston-blumenthal-egg-verjuice.jpg?w968h681'));
    this.recipes.push(new Recipe("Chicken Tikka Masala", "Spicy indian tikka masala gravy", "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/27/0/ZA0207H_chicken-in-creamy-tomato-curry-chicken-tikka-masala_s4x3.jpg.rend.hgtvcom.616.462.suffix/1387303023791.jpeg"));
    this.recipes.push(new Recipe("Chicken Vindaloo", "Chicken creamy gravy", "https://2117e.https.cdn.softlayer.net/802117E/www.archanaskitchen.com/images/archanaskitchen/0-Saffola_FitFoodie/1-Chicken_Vindaloo_Recipe_Saffola_Oats_Fit_Foodie-1.jpg"));
  }

  onRecipeSelected(recipeEl:Recipe){
    this.recipeItemSelected.emit(recipeEl);
  }
}
