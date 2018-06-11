import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth-guard.service';

import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
    { path: 'recipes', component: RecipesComponent,
        children:[
            { path: '', component: RecipeHomeComponent},
            { path: 'new', component: RecipeEditComponent,canActivate:[AuthGuard]},
            { path: ':id', component: RecipeDetailComponent},
            { path: ':id/edit', component: RecipeEditComponent,canActivate:[AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {
}