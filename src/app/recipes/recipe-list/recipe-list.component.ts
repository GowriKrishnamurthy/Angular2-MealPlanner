import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
    recipesState:Observable<{recipe:fromRecipe.RecipeState}>;
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private store:Store<{recipe:fromRecipe.RecipeState}>){ }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
  OnNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
