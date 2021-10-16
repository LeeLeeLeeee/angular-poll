import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
  
})
export class ToggleComponent implements OnInit {
  @Input() toggleStatus : boolean;
  @Output() toggleEvent = new EventEmitter<any>();
  constructor() { 
    this.toggleStatus = false;
  }

  ngOnInit(): void {
  }
}
