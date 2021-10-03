import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionType } from 'src/app/shared/components/select/select.component';




@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  private _projectId : string = ""
  private _taskId : string = ""
  
  innreMenu : string = "tool"
  questionFilter : OptionType[] = []
  questionList : number[] = [1, 2, 3, 4, 5, 6 ]
  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params.projectId;
    this.taskId = this.route.snapshot.params.taskId;

    this.questionFilter = [
      {label: '단수 문항', value: "1"},
      {label: '복수 문항', value: "2"},
      {label: '속성 문항', value: "3"},
      {label: '순위 문항', value: "4"},
      {label: '자유 문항', value: "5"},
    ]

    
  }

  ngOnInit(): void {
  }

  get projectId() {
    return this._projectId
  }
  
  set projectId(id : string) {
    this._projectId = id
  }

  get taskId() {
    return this._taskId
  }
  
  set taskId(id : string) {
    this._taskId = id
  }

}
