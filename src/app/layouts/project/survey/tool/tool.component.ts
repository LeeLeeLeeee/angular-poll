import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  hideChat : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  hide() {
    this.hideChat = true;
    setTimeout(()=>{
      this.hideChat = false
    }, 1000)
  }

}
