import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
  
})
export class ToggleComponent implements OnInit {
  @Input() toggleStatus : boolean;
  @Output() toggleEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
}
