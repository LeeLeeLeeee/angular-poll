import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DateService {
    private _now : Date = new Date();
    private _month: number = 0;
    private _day: number = 0;
    private _date: number = 0;
    private _year: number = 0;

    constructor() {
        this._month = this._now.getMonth() + 1;
        this._date = this._now.getDate();
        this._day = this._now.getDay()  ;
        this._year = this._now.getFullYear();
    }

    getFirstDay(year : number = this._year , month: number = this._month) : number {
        return new Date(`${year}-${month}-1`).getDay();
    }

    getLastDay(year : number = this._year , month: number = this._month) : number {
        return new Date(`${year}-${month}-${this.getCountDate(year, month)}`).getDay();
    }

    getCountDate(year : number = this._year , month: number = this._month) : number {
        return new Date(year, month, 0).getDate();
    }

    getCountWeek(year : number = this._year , month: number = this._month) : number {
        const firstDate = this.getFirstDay(year, month);
        const totalDate = this.getCountDate(year, month);
        return Math.ceil((firstDate + totalDate) / 7)
    }

    set month(month) {
        this._month = month;
    }

    set year(year) {
        this._year = year;
    }

    get calendarInfo() {
        return {
            day: this._day,
            month: this._month,
            year: this._year,
            date: this._date,
            firstDate:this.getFirstDay(),
            totalDate: this.getCountDate(),
            weekCnt: this.getCountWeek(),
            lastDay: this.getLastDay(),
            nowYear: this._now.getFullYear(),
            nowMonth: this._now.getMonth() + 1
        }
    }

    
}