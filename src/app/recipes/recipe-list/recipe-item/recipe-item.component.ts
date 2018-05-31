import { EventEmitter,Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe :Recipe;
  @Output('recipeSelected') recipeSelected=new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onSelected()
  {
    this.recipeSelected.emit();
  }
}
