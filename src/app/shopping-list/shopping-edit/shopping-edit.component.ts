import { Output, EventEmitter, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @Output('ingredientAdded') ingredientAdded = new EventEmitter<{name:string, amount:number}>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(){  
     const ingName= this.nameInputRef.nativeElement.value;
     const ingAmount= this.amountInputRef.nativeElement.value;
     const newIngredient= new Ingredient(ingName,ingAmount);
     this.ingredientAdded.emit(newIngredient);     
  }
}
