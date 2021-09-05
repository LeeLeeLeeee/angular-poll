import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { keyable } from 'src/app/shared/interface/keyable-interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { taskForm } from '../project.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewInit {
  taskForm : FormGroup;
  projectId : string;
  errorList : keyable = {}
  errorText : keyable = {}
  tasks: keyable[] = [];
  status: keyable = {
    total: 0,
    start: 0,
    end: 0,
  };
  taskType : keyable[] = [
    {label : "Banner survey", value: "1"},
    {label : "List survey", value: "2"}
  ]
  success : boolean = false;

  @ViewChild("createModal") createModal : ElementRef;
  @ViewChild("deleteModal") deleteModal : ElementRef;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService : ModalService,
    private fb : FormBuilder
  ) {
    this.taskForm = this.fb.group({})
    this.projectId = this.route.snapshot.params.id;

  }

  tbyi(id, item) {
    if (!item) return null;
    return item.id;
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngAfterViewInit() {
    this.modalService.create('create', ['shadow-border'], "xl");
    this.modalService.append('create', this.createModal.nativeElement);
    this.modalService.create('delete', ['shadow-border'], "lg");
    this.modalService.append('delete', this.deleteModal.nativeElement);
    
  }

  getTaskList() {
    if (!!(this.projectId)) {
      this.taskService
        .select(this.projectId)
        .then((data) => {
          this.tasks = data.taskList;
          const tasksStatics = this.tasks.reduce((prev, cur) => {
            if (cur.taskStatus === '2') {
              prev.start = !prev.start ? 1 : prev.start + 1;
            } else if (cur.taskStatus === '3') {
              prev.end = !prev.end ? 1 : prev.end + 1;
            }
            return prev;
          }, {});
          this.status = {total: this.tasks.length, ...tasksStatics}
        })
        .catch((_) => {
          console.log(_);
        });
    }
  }

  statusToText(status: string): string {
    let text = '';
    switch (status) {
      case '1':
        text = '설문 준비';
        break;
      case '2':
        text = '설문 시작';
        break;
      case '3':
      default:
        text = '설문 종료';
        break;
    }
    return text;
  }

  openModal() {
    this.modalService.show('create', {isWrapper: true})
  }

  closeModal(name : string) {
    this.taskService.id = ''
    this.modalService.hide(name, {isWrapper: true})
  }

  createAgain() {
    this.taskForm.reset();
    this.errorList = {};
    this.errorText = {};
    this.success = false;
  }

  createTask(e) {
    e.preventDefault();
    
    if(this.taskForm.valid) {
      let postForm : taskForm;
      postForm = {
        projectId: this.projectId,
        startDate: this.taskForm.get('from.from').value,
        endDate: this.taskForm.get('to.to').value, 
        registerId: 26,
        taskTitle: this.taskForm.get('title.title').value,
        taskDescription: this.taskForm.get('description.description').value,
        taskType: this.taskForm.get('taskType.taskType').value
      } 
      this.taskService.create(postForm)
        .subscribe(
          (res) => {
            this.success = true;
            this.getTaskList();
          },
          (res) => {
            if( res?.error?.error == 'already exist' ) {
              this.errorList['title'] = true;
              this.errorText['title'] = 'This title already exists'
            }
          }
        )
     
    } else {
      for( let control in this.taskForm.controls) {
        if( !this.taskForm.get(control).valid ) {
          this.errorList[control] = true;
          this.errorText[control] = `${control} is required`
        } else {
          this.errorList[control] = false;
        }
      }
    }
  }

  deleteTask(e : MouseEvent) {
    this.taskService.delete()
    .then((value) => {
      this.taskService.id = '';
      this.modalService.hide('delete', {isWrapper: true})
      this.getTaskList();
    })
    .catch((reason)=> {
      console.log(reason)
    })
  }

  openDeleteModal(id : string) {
    this.taskService.id = id;
    this.modalService.show('delete', {isWrapper: true})
  }

  backToProject() {
    this.router.navigate(['project'])
  }
}
