import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Question from '../question.class';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Input() question: Question;
  constructor() {
    
  }

  ngOnInit(): void {
      
  }

}

@Component({
  selector: 'app-single-option',
  templateUrl: './single-option.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleOptionComponent implements OnInit {
  @Input() question: Question;
  constructor() { }

  ngOnInit(): void {
  }

}
