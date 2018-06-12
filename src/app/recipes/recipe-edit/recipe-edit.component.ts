import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
    private router:Router,
    private recipeService: RecipeService) { 
    }

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
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          ingredientsFormArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
      this.recipeForm = new FormGroup({
        'recipeName': new FormControl(recipeName, Validators.required),
        'recipeDescription': new FormControl(recipeDescription, Validators.required),
        'recipeImagePath': new FormControl(recipeImagePath, Validators.required),
        'ingredients': ingredientsFormArray
      });
  }
  onAddIngredient() {
    const control = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }
  onSubmit() {
     const formVal = this.recipeForm.value;
     const newRecipe = new Recipe(formVal.recipeName, formVal.recipeDescription,formVal.recipeImagePath,formVal.ingredients);
    //const newRecipe = new Recipe(this.recipeForm.value['recipeName'], this.recipeForm.value['recipeDescription'],this.recipeForm.value['recipeImagePath'],this.recipeForm.value['ingredients']);
    if (this.editMode)
      this.recipeService.updateRecipe(this.id,newRecipe); 
    else
      this.recipeService.addRecipe(newRecipe); 
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
