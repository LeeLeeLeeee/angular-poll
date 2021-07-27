import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";

export const IndexRoutes: Routes = [
  {
    path: "",
    component:IndexComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  }
];
