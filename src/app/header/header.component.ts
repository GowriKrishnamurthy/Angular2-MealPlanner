import {  EventEmitter, Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('featureSelected') featureSelected =new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }
}
