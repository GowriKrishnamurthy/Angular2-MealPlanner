import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
  }

  private initForm() {
    let ingredientsFormArray = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          ingredientsFormArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
      this.recipeForm = new FormGroup({
        'recipeName': new FormControl(recipe.name, Validators.required),
        'recipeDescription': new FormControl(recipe.description, Validators.required),
        'imagePath': new FormControl(recipe.imagePath, null),
        'ingredients': ingredientsFormArray
      });
    }
  }
  onSubmit() {
    console.log(this.recipeForm);
  }
}
