import { Component, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { QuestionListService } from 'src/app/shared/services/question-list.service';
import Question, { QuestionType } from './question.class';
declare const $: any;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questionObject: Question = null;
  intervalId: any;
  constructor(private questionListService: QuestionListService) {
    this.questionObject = new Question('single');
  }

  ngOnInit(): void {
    $('#search-select').dropdown();
  }

  ngOnDestroy(): void {}

  changeQuestionTypeWithReset(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.questionObject.resetQuestionItem();
    let questionItem = this.questionObject.getQuestionItem();
    questionItem.questionType = value as QuestionType;
    this.questionObject.setQuestionItem(questionItem);
  }
}
