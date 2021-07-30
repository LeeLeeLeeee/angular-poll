import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PasswordValidator } from 'src/app/shared/validator/password-validator';
import { SignInForm } from '../signin/signin.component';

export interface UserForm {
  user_id: string,
  password: string,
  firstname: string,
  lastname: string,
  login_count: number,
  is_superuser: boolean

}

export interface FormType {
  user_id: boolean;
  first_name: boolean;
  last_name: boolean;
  duplicated: boolean
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  pwValidStatus: boolean = false;
  userForm: FormGroup;
  modalClose: boolean = true;
  formError: FormType = {
    user_id: false,
    first_name: false,
    last_name: false,
    duplicated: false,
  };

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    const _this = this;
    this.userForm = this.fb.group({
      user_id: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          ),
        ],
      ],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [Validators.required, Validators.pattern('[^ㄱ-ㅎ가-힣]{8,}')],
          ],
          confirm_password: [
            '',
            [Validators.required, Validators.pattern('[^ㄱ-ㅎ가-힣]{8,}')],
          ],
        },
        { validators: PasswordValidator.match }
      ),
    });

    this.userForm.get('passwordGroup').valueChanges.subscribe(
      function (x) {
        if (
          this.status === 'VALID' ||
          this.controls.password.pristine ||
          this.controls.confirm_password.pristine
        ) {
          _this.pwValidStatus = false;
        } else {
          _this.pwValidStatus = true;
        }
      }.bind(this.userForm.get('passwordGroup'))
    );
  }

  signUpUser(userForm: FormGroup) {
    const passwordGroup = userForm.get('passwordGroup');
    const requestForm : UserForm = {
      user_id: '',
      password: '',
      firstname: '',
      lastname: '',
      login_count: 0,
      is_superuser: false,
    };
    this.formError['user_id'] = userForm.controls.user_id.invalid;
    this.formError['first_name'] = userForm.controls.first_name.invalid;
    this.formError['last_name'] = userForm.controls.last_name.invalid;
    

    if (passwordGroup.status === 'INVALID') {
      this.pwValidStatus = true;
    }

    if (userForm.status === 'VALID') {
      requestForm['user_id'] = userForm.value.user_id
      requestForm['password'] = passwordGroup.value.password
      requestForm['firstname'] = userForm.value.first_name
      requestForm['lastname'] = userForm.value.last_name
      this.authService
        .signUpService(requestForm)
        .subscribe( _ => 
          {
            this.modalClose = false
          },
          (res) => {
            
            if( res.error.error === "already exist" ) {
              this.formError.duplicated = true;
            }
          }
        )
    }
  }

  goToSignIn(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(['/login/signin']);
  }

  SignInSubmit(e: MouseEvent) {
    e.preventDefault()
    const passwordGroup = this.userForm.get('passwordGroup');
    const signInForm : SignInForm = {
      user_id: this.userForm.get('user_id').value,
      password: passwordGroup.get('password').value
    }
    this.authService
    .signInService(signInForm)
    .subscribe(msg => console.log(msg))  
  }
}
