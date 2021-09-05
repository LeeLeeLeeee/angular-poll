import { Component, OnInit } from '@angular/core';



export interface projectForm {
  startDate : string
  endDate : string
  projectTitle : string
  registerId : number
  projectDescription : string
}

export interface taskForm {
  projectId: string
  startDate: string
  endDate: string
  taskTitle: string
  registerId : number
  taskDescription: string
  taskType: string
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
