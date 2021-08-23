import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { keyable } from '../../interface/keyable-interface';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-calendar-input',
  templateUrl: './calendar-input.component.html',
  styleUrls: ['./calendar-input.component.scss']
})
export class CalendarInputComponent implements OnInit, AfterContentInit, OnDestroy {
  isCalendarOn : boolean = false;
  calendarInfo : keyable = {};
  isMonth : boolean = false;
  isYear : boolean = false;
  selectedDate : string = '';
  @ContentChild('hiddenInput') inputEle : ElementRef;
  @ViewChild('calendarBody') calendarElement : ElementRef;
  @Input('parentForm') parenrForm : FormGroup;

  constructor(private dateService : DateService, private render : Renderer2) {
    this.calendarInfo = this.dateService.calendarInfo;
  }

  ngOnInit(): void {
    document.body.addEventListener('click', (event : Event)=> {
      if(this.isCalendarOn) {
        const toClose = !(event.target as HTMLElement).closest(`.calendar-body, .${this.contolerName}-btn`)
        if(toClose) {
          this.toggleCalendar()
        }
      }
    })
  }

  ngAfterContentInit() : void {

  }

  ngOnDestroy() : void {

  }

  blanckDateStart() {
    return Array(this.calendarInfo.firstDate).fill('')
  }

  realDate() {
    return Array(this.calendarInfo.totalDate).fill('').map((_, i) => i+1);
  }

  blanckDateLast() {
    return Array(7 - this.calendarInfo.lastDay).fill('')
  }

  choiceMonth(e : MouseEvent) {
    this.isMonth = !this.isMonth
  }

  choiceYear(e : MouseEvent) {
    this.isYear = !this.isYear
  }

  monthList() {
    return Array(12).fill('').map((_, i) => i + 1)
  }

  yearList() {
    return [
      ...Array(10).fill('').map((_, i) => this.calendarInfo.year - ( 10 - i) ),
      ...Array(10).fill('').map((_, i) => this.calendarInfo.year + ( i) )
    ]
  }

  toggleCalendar() {
    this.isCalendarOn = !this.isCalendarOn;
    if(this.isCalendarOn) {
      this.render.setStyle(this.calendarElement.nativeElement, 'display', 'block')
    } else {
      setTimeout(()=>{
        this.render.setStyle(this.calendarElement.nativeElement, 'display', 'none')
      }, 600)
    }
  }

  changeMonth(month) {
    this.dateService.month = month;
    this.calendarInfo = this.dateService.calendarInfo
  }

  changeYear(year) {
    this.dateService.year = year;
    this.calendarInfo = this.dateService.calendarInfo
  }

  checkToday(date) : boolean {
    return this.calendarInfo.month === this.calendarInfo.nowMonth  &&
      this.calendarInfo.year === this.calendarInfo.nowYear  &&
      this.calendarInfo.date === date
  }
  
  choiceDate(date) {
    this.selectedDate = `${this.calendarInfo.year}/${this.calendarInfo.month}/${("0"+date).slice(1)}`
    this.parenrForm.get(this.inputEle.nativeElement.name).setValue(this.selectedDate);
    this.toggleCalendar();
  }

  get contolerName() {
    return this.inputEle.nativeElement.name
  }

}
