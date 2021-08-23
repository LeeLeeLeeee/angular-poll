import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  paths : string[] = []
  constructor(private layoutService: LayoutService) {
    this.layoutService.pathValueChanger.subscribe(path => {
      this.paths = path;
    })

  }

  toggle() {
    this.layoutService.toggleSidebarVisibility();
  }

  ngOnInit(): void {

  }

}
