import { Routes } from "@angular/router";
import { SignComponent } from "./sign.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


export const SignRoutes: Routes = [
    {
        path: "",
        component:SignComponent,
        children: [
            {
                path:"",
                component: SigninComponent
            },
            {
                path:"signup",
                
                component: SignupComponent
            }
        ]
    }
]