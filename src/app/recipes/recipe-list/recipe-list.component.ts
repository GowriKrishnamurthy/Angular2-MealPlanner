import {Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
    recipes:Recipe[]=[];
    private subscription:Subscription;
  
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
    
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
         (recipes:Recipe[])=> {
          this.recipes=recipes;
         } 
      );
      this.recipes = this.recipeService.getRecipes();  
  }
  OnNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
