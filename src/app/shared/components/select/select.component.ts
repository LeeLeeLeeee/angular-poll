import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs'
import { keyable } from '../../interface/keyable-interface';
export interface OptionType {
  label: string
  value: string
  defaultValue?: boolean
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit {
  @Input() selectTitle : string = "";
  @Input() options : OptionType[] = [];
  @Input() isMultiple : boolean = false;
  @Input() defaultValue : string = "";
  @Input() placeHolder : string = "";

  @ViewChild('selectElement') selectElement : ElementRef;
  selectedValue : keyable = {};
  isOptionOpen : boolean = false;

  constructor(private renderer : Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void {
    console.log(this.selectElement.nativeElement);
    
  }

  toggleOption() {
    this.isOptionOpen = !this.isOptionOpen;
  }

  getSelectValue() : string {
    return Object.keys(this.selectedValue).join(',');
  }

  getSelectLabel() : string {
    return Object.values(this.selectedValue).join(',');
  }

  selectValue(value : OptionType) {
    if(this.isMultiple) {
      this.selectedValue[value.value] = value.label
    } else {
      this.selectedValue = {[value.value]: value.label};
    }
    this.isOptionOpen = false;
  }

  isSelected(item : OptionType) : String[] {
    if( this.selectedValue.hasOwnProperty(item.value) ) {
      return ['active']
    } else {
      return []
    }
    
  }

}
