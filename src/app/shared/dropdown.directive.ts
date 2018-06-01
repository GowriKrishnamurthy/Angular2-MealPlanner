import { Directive,  HostListener, HostBinding, Renderer, ElementRef } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective
{
    @HostBinding('class.open') dropdown:boolean=false;

    @HostListener('click') mouseclick (eventData: Event){
        this.dropdown=!this.dropdown;
    }
}

//  Approacch 2: to bind css class open dynamically 
//     dropdown:boolean=false;

//     constructor(private elementRef:ElementRef,private renderer:Renderer) { }
//     @HostListener('click') mouseclick (eventData: Event){
//         this.dropdown = !this.dropdown;
//         if(this.dropdown)
//             this.renderer.setElementClass(this.elementRef.nativeElement, 'open',true);
//         else
//             this.renderer.setElementClass(this.elementRef.nativeElement, 'open',false);
//      }
//   }