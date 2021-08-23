import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ControlContainer, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() inputType : string = "text";
  @Input() titleText : string = "";
  @Input() titleIcon : string[] = [];
  @Input() isLeftTitle : boolean = true;
  @Input() leftText : string = "";
  @Input() leftIcon : string[] = [];
  @Input() rightText : string = "";
  @Input() rightIcon : string[] = [];
  @Input() controlerName : string = "";
  @Input() parentGroup : FormGroup;
  @Input() required : boolean = false;
  @Input() validator : string = ""
  @Input() error : boolean = false;
  @Input() errorTitle : string = ""
  inputGroup : FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    let controlerValid = []
    if(this.required) controlerValid.push(Validators.required)

    this.inputGroup = new FormGroup({
      [this.controlerName]: new FormControl('', controlerValid)
    })
    this.parentGroup.addControl(this.controlerName, this.inputGroup)
   
  }
}
