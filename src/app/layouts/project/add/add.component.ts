import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { keyable } from 'src/app/shared/interface/keyable-interface';
import { ProjectService } from 'src/app/shared/services/project.service';
import { projectForm } from '../project.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit {
  projectForm: FormGroup;
  errorList : keyable = {};
  errorText : keyable = {};
  success : boolean = false;
  constructor(
    private fb : FormBuilder,
    private projectService : ProjectService,
    private router : Router,
  ) { 
    this.projectForm = this.fb.group({})
    this.projectForm

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void {
  }

  createAgain() {
    this.projectForm.reset();
    this.errorList = {};
    this.errorText = {}
    this.success = false;
  }

  backToProject() {
    this.router.navigate(['project'])
  }

  formSubmit(e : MouseEvent) {
    e.preventDefault();
    
    if(this.projectForm.valid) {
      let postForm : projectForm;
      postForm = {
        endDate: this.projectForm.get('to.to').value, 
        startDate: this.projectForm.get('from.from').value,
        registerId: 26,
        projectTitle: this.projectForm.get('title.title').value,
        projectDescription: this.projectForm.get('description.description').value
      } 
      this.projectService.create(postForm)
        .subscribe(
          (res) => {
            this.success = true;
          },
          (res) => {
            if( res?.error?.error == 'already exist' ) {
              this.errorList['title'] = true;
              this.errorText['title'] = 'This title already exists'
            }
          }
        )
    } else {
      for( let control in this.projectForm.controls) {
        if( !this.projectForm.get(control).valid ) {
          this.errorList[control] = true;
          this.errorText[control] = `${control} is required`
        } else {
          this.errorList[control] = false;
        }
      }
    }
  }
}
