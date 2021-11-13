import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { keyable } from '../../interface/keyable-interface';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-calendar-input',
  templateUrl: './calendar-input.component.html',
  styleUrls: ['./calendar-input.component.scss'],
})
export class CalendarInputComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  isCalendarOn: boolean = false;
  isMonth: boolean = false;
  isYear: boolean = false;

  monthList: number[] = Array(12)
    .fill('')
    .map((_, i) => i + 1);
  yearList: string[] = [];
  blanckDateStart: string[] = [];
  blanckDateLast: string[] = [];
  realDate: number[] = [];
  selectedDate: string = '';

  @ContentChild('hiddenInput') inputEle: ElementRef;
  @ViewChild('calendarBody') calendarElement: ElementRef;

  @Input('parentForm') parenrForm: FormGroup;
  @Input('calendarInfo') calendarInfo: keyable;

  constructor(private dateService: DateService, private render: Renderer2) {
    this.calendarInfo = { ...this.dateService.calendarInfo };
    this.yearList = [
      ...Array(10)
        .fill('')
        .map((_, i) => this.calendarInfo.year - (10 - i)),
      ...Array(10)
        .fill('')
        .map((_, i) => this.calendarInfo.year + i),
    ];
    this.updateDate();
  }

  ngOnInit(): void {
    document.body.addEventListener('click', (event: Event) => {
      if (this.isCalendarOn) {
        const toClose = !(event.target as HTMLElement).closest(
          `.calendar-body, .${this.contolerName}-btn`
        );
        if (toClose) {
          this.toggleCalendar();
        }
      }
    });
  }

  ngAfterContentInit(): void {
    this.parenrForm
      .get(this.inputEle.nativeElement.name)
      .valueChanges.subscribe((date) => {
        this.selectedDate = date;
      });
  }

  ngOnDestroy(): void {}

  getBlanckDateStart() {
    return Array(this.calendarInfo.firstDate).fill('');
  }

  getRealDate() {
    return Array(this.calendarInfo.totalDate)
      .fill('')
      .map((_, i) => i + 1);
  }

  getBlanckDateLast() {
    return Array(7 - this.calendarInfo.lastDay).fill('');
  }

  choiceMonth(e: MouseEvent) {
    this.isMonth = !this.isMonth;
  }

  choiceYear(e: MouseEvent) {
    this.isYear = !this.isYear;
  }

  toggleCalendar() {
    this.isCalendarOn = !this.isCalendarOn;
    if (this.isCalendarOn) {
      this.render.setStyle(
        this.calendarElement.nativeElement,
        'display',
        'block'
      );
    } else {
      setTimeout(() => {
        this.render.setStyle(
          this.calendarElement.nativeElement,
          'display',
          'none'
        );
      }, 600);
    }
  }

  changeMonth(month) {
    this.dateService.month = month;
    this.calendarInfo = { ...this.dateService.calendarInfo };
    this.updateDate();
  }

  changeYear(year) {
    this.dateService.year = year;
    this.calendarInfo = { ...this.dateService.calendarInfo };
    this.yearList = [
      ...Array(10)
        .fill('')
        .map((_, i) => this.calendarInfo.year - (10 - i)),
      ...Array(10)
        .fill('')
        .map((_, i) => this.calendarInfo.year + i),
    ];
    this.updateDate();
  }

  updateDate() {
    this.blanckDateStart = this.getBlanckDateLast();
    this.blanckDateLast = this.getBlanckDateStart();
    this.realDate = this.getRealDate();
  }

  checkToday(date): boolean {
    return (
      this.calendarInfo.month === this.calendarInfo.nowMonth &&
      this.calendarInfo.year === this.calendarInfo.nowYear &&
      this.calendarInfo.date === date
    );
  }

  choiceDate(date) {
    const selectedDate = `${this.calendarInfo.year}/${
      this.calendarInfo.month
    }/${('0' + date).slice(1)}`;
    this.parenrForm
      .get(this.inputEle.nativeElement.name)
      .setValue(selectedDate);
    this.toggleCalendar();
  }

  get contolerName() {
    return this.inputEle.nativeElement.name;
  }
}
