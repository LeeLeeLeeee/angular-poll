import { Injectable } from '@angular/core';
import Question from 'src/app/layouts/project/survey/question/question.class';


interface QuestionListMethod {
  appendQuestion(question: Question): void
  getQuestionList(): Question[]
  sortQuestionList(type: string): Question[]
  filterQuestionList(option: any): Question[]
  findQuestion(option: any): Question[]
  checkQuestion(id: number, checked: boolean): void
  checkAllQuestion(): void
  clearcheckAllQuestion(): void
  setQuestionOrder(questions: Question[], targetIndex: number): void
  /* todo : db 연동하여 max 아이디 가져오게 변경 */
  getQuestionMaxId(): number
}

@Injectable({
  providedIn: 'root'
})
export class QuestionListService implements QuestionListMethod {
  private questionList : Question[] = [];

  constructor() { }

  appendQuestion(question: Question): void {
    this.questionList.push(question);
  }

  getQuestionList(): Question[] {
    throw new Error('Method not implemented.');
  }

  sortQuestionList(type: string): Question[] {
    throw new Error('Method not implemented.');
  }

  filterQuestionList(option: any): Question[] {
    throw new Error('Method not implemented.');
  }

  findQuestion(option: any): Question[] {
    throw new Error('Method not implemented.');
  }

  checkQuestion(id: number, checked: boolean): void {
    throw new Error('Method not implemented.');
  }

  checkAllQuestion(): void {
    throw new Error('Method not implemented.');
  }

  clearcheckAllQuestion(): void {
    throw new Error('Method not implemented.');
  }

  setQuestionOrder(questions: Question[], targetIndex: number): void {
    throw new Error('Method not implemented.');
  }

  getQuestionMaxId(): number {
    return this.questionList.length + 1;
  }

}
