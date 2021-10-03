import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-button',
  templateUrl: './img-button.component.html',
  styleUrls: ['./img-button.component.scss']
})
export class ImgButtonComponent implements OnInit {
  @Input() iconName : string = ""
  @Input() bgColor : string = "white"
  @Input() size : string = "md"
  @Input() toolTip : string = ""
  iconAttribute : string[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.iconAttribute = [this.size, this.bgColor]
  }

}
