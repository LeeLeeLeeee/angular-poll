import { LoginComponent } from "./sign/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { AuthGuard } from "../shared/services/auth-guard";

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
