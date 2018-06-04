import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component'; 
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes',pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent,
        children:[
            { path: '', component: RecipeHomeComponent}
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    // {path:'not-found',component:PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: { errorMessage: 'There seems to be some problem.!The page requested was not found!!' } },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}