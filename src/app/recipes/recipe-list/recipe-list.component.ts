import { EventEmitter,Output,Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  @Output('recipeItemSelected') recipeItemSelected=new EventEmitter<Recipe>();
  recipes:Recipe[]=[
    new Recipe('Lemon Tart', 'Creamy and dreamy lemon curd filling','https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/lemon-tart_A0.jpg?itok=gdqsna43&mtime=1379314018'),
    new Recipe('Easter Egg', 'The Egg in Verjuice','https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/03/28/16/heston-blumenthal-egg-verjuice.jpg?w968h681')
    ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipeEl:Recipe){
    this.recipeItemSelected.emit(recipeEl);
  }
}
