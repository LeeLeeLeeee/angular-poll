import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


export const LoginRoutes: Routes = [
    {
        path: "login",
        component:LoginComponent,
        children: [
            {
                path:"signin",
                component: SigninComponent
            },
            {
                path:"signup",
                component: SignupComponent
            }
        ]
    }
]