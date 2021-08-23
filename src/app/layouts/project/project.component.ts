import { Component, OnInit } from '@angular/core';

export interface projectForm {
  startDate : string
  endDate : string
  projectTitle : string
  registerId : number
  projectDescription : string
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  }

  
}
