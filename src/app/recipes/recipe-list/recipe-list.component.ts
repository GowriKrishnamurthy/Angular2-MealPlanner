import { EventEmitter,Output,Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  @Output('recipeItemSelected') recipeItemSelected=new EventEmitter<Recipe>();
  recipes:Recipe[]=[];
  
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();    
  }

  onRecipeSelected(recipeEl:Recipe){
    this.recipeItemSelected.emit(recipeEl);
  }
}
