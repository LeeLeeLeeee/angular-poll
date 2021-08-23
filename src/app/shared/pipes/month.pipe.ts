import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'month',
    pure: true
})
export class MonthPipe implements PipeTransform {
    transform(value: number, type: string = 'short' ) {
        let mon = ""
        switch(value) {
            case 1: 
            mon = type === 'short' ? 'Jan' : 'January'
            break;
            case 2: 
            mon = type === 'short' ? 'Feb' : 'February'
            break;
            case 3: 
            mon = type === 'short' ? 'Mar' : 'March'
            break;
            case 4: 
            mon = type === 'short' ? 'Apr' : 'April'
            break;
            case 5: 
            mon = type === 'short' ? 'May' : 'May'
            break;
            case 6: 
            mon = type === 'short' ? 'Jun' : 'June'
            break;
            case 7: 
            mon = type === 'short' ? 'July' : 'July'
            break;
            case 8: 
            mon = type === 'short' ? 'Aug' : 'August'
            break;
            case 9: 
            mon = type === 'short' ? 'Sep' : 'September'
            break;
            case 10: 
            mon = type === 'short' ? 'Oct' : 'October'
            break;
            case 11: 
            mon = type === 'short' ? 'Nov' : 'November'
            break;
            case 12: 
            mon = type === 'short' ? 'Dec' : 'December'
            break;
        }

        return mon;
    }
}