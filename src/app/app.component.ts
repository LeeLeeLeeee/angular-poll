import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = 'poll-server';
  constructor(private router: Router, private layoutService: LayoutService) {
    this.router.events.subscribe(
      (path) => {
        if (path instanceof NavigationEnd) {
          this.layoutService.changePathValue(path.urlAfterRedirects.split('/').slice(1));
        }
      },
      () => {},
      () => {}
    );
  }
}
