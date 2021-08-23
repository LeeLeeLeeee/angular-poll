import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    isSidebarOpen: boolean = true;
    sidebarOpenChanger: Subject<boolean> = new Subject<boolean>();
    isWrapperOpen: boolean = true;
    wrapperOpenChanger: Subject<boolean> = new Subject<boolean>();
    pathValue: string[] = [];
    pathValueChanger: Subject<string[]> = new Subject<string[]>();
    
    constructor() {
        this.sidebarOpenChanger.subscribe((value)=> {
            this.isSidebarOpen = value;
        })

        this.wrapperOpenChanger.subscribe((value)=> {
            this.isWrapperOpen = value;
        })

        this.pathValueChanger.subscribe((path)=> {
            this.pathValue = path;
        })
    }

    changePathValue(path) {
        this.pathValueChanger.next(path);
    }

    toggleSidebarVisibility() {
        this.sidebarOpenChanger.next(!this.isSidebarOpen);
    }

    convertEventToElement(event : Event) : HTMLElement {
        return (event.target as HTMLElement);
    }

}