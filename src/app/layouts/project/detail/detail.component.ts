import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { keyable } from 'src/app/shared/interface/keyable-interface';
import { lineChartDataset } from 'src/app/shared/interface/chart-interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { taskForm } from '../project.component';
import { projectForm } from '../project.component';
import { LayoutService } from 'src/app/shared/services/layout.service';

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
  filter : keyable = {
    taskTitle: ''
  }
  success : boolean = false;
  selectedTaskId : string = '';
  targetProjectInfo : projectForm;
  dailyAccessUser : lineChartDataset[];

  @ViewChild("createModal") createModal : ElementRef;
  @ViewChild("deleteModal") deleteModal : ElementRef;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService : ModalService,
    private layoutService : LayoutService,
    private fb : FormBuilder
  ) {
    this.taskForm = this.fb.group({})
    this.projectId = this.route.snapshot.params.id;
    this.dailyAccessUser = [
      {
        name: 'user',
        series: [
          {name: '09-21', value: 20},
          {name: '09-22', value: 13},
          {name: '09-23', value: 15},
          {name: '09-24', value: 25},
          {name: '09-25', value: 30},
        ]
      }
    ]
  }

  tbyi(id, item) {
    if (!item) return null;
    return item.id;
  }

  ngOnInit(): void {
    this.projectService.getOne(this.projectId).then((res : projectForm) => {
      this.targetProjectInfo = res
    })

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
        .select(this.projectId, this.filter)
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
    this.taskService.delete(this.selectedTaskId)
    .then((value) => {
      this.selectedTaskId = '';
      this.modalService.hide('delete', {isWrapper: true})
      this.getTaskList();
    })
    .catch((reason)=> {
      console.log(reason)
    })
  }

  searchTask(e : KeyboardEvent) {
    if (e.key === 'Enter') {
      const target = this.layoutService.convertEventToElement(e as Event);
      this.filter.taskTitle = (target as HTMLInputElement).value;
      this.getTaskList();
    }
  }

  clearTask() {
    this.filter.taskTitle = '';
    this.getTaskList();
  }

  openDeleteModal(id : string) {
    this.selectedTaskId = id;
    this.modalService.show('delete', {isWrapper: true})
  }

  backToProject() {
    this.router.navigate(['project'])
  }

  goToSurvey(taskId : string) {
    this.router.navigate(['project', this.projectId, taskId])
  }
}
