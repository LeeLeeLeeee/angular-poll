import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  sideMenuToggle: boolean = true;
  menu  : string = 'dashboard'
  constructor(private layoutService: LayoutService, private router: Router) {
    this.layoutService.sidebarOpenChanger.subscribe((value) => {
      this.sideMenuToggle = value;
    })
    this.layoutService.pathValueChanger.subscribe((path) => {
      switch(path[0]){
        case "dashboard":
        case "project":
        case "analysis":
        case "schedule":
        case "taskManage":
          this.menu = path[0];
          break;
      }
    })
  }

  ngOnInit(): void {
    
  }

  menuClick(menu: string) {
    this.menu = menu;
    this.router.navigate([`/${menu}`])
  }
}
