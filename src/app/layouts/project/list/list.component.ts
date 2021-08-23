import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { keyable } from 'src/app/shared/interface/keyable-interface';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  projectLists: keyable[] = [];
  toggleStatus: boolean = false;
  page: number = 1;
  pageSize: number = 3;
  lastPage: number = 0;
  totalCount: number = 0;
  contextMenu: boolean = false;
  selectedId: string = '';
  filter: keyable = {
    projectTitle: '',
    status: '',
  };
  @ViewChild('contextMenuElement') ctxElement: ElementRef;
  @ViewChild('deleteModal') deleteModal : ElementRef;
  constructor(
    private renderer: Renderer2,
    private layoutService: LayoutService,
    private router: Router,
    private projectService: ProjectService,
    private modalService : ModalService
  ) {}

  closeContextMenu(e): any {
    const target = this.layoutService.convertEventToElement(e);
    const isMenuBtn = target.classList.contains('menu-btn');
    if (this.contextMenu && !isMenuBtn) {
      this.contextMenu = !this.contextMenu;
      this.selectedId = '';
    }
    return true;
  }

  ngOnInit(): void {
    this.totalCount = this.projectLists.length;
    this.closeContextMenu = this.closeContextMenu.bind(this);
    document.body.addEventListener('click', this.closeContextMenu);
    this.getProjectLists(1);
    this.modalService.create('delete', ['shadow-border', 'lg']);
    
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.closeContextMenu);
  }

  ngAfterViewInit() : void {
    this.modalService.append('delete', this.deleteModal.nativeElement)
    this.modalService.show('delete')
  }

  changeToggleStatus() {
    this.toggleStatus = !this.toggleStatus;
  }

  getProjectLists(page?: number) {
    if (page) this.page = page;
    let params: keyable = {
      page: this.page,
      page_size: this.pageSize,
    };
    if (this.filter.projectTitle !== '')
      params.projectTitle = this.filter.projectTitle;
    if (this.filter.status !== '') params.status = this.filter.status;

    this.projectService
      .select(params)
      .then((data) => {
        this.projectLists = data.projectList;
        this.totalCount = data.totalCount;
        this.lastPage = Math.ceil(this.totalCount / this.pageSize);
      })
      .catch((_) => {
        console.log(_);
      });
  }

  trackById(project) {
    return project.id;
  }

  changePage(page: number): boolean {
    if (page > this.lastPage || page < 1 || !page) {
      return false;
    }
    this.getProjectLists(page);
    return true;
  }

  openMenu(e: MouseEvent, id: string) {
    const ctxElement = this.ctxElement.nativeElement;
    this.selectedId = id;
    const target = this.layoutService.convertEventToElement(e);
    if (!(target instanceof HTMLDivElement)) {
      const { top, right } = target.getClientRects()[0];
      this.renderer.setStyle(
        ctxElement,
        'left',
        `${right - ctxElement.clientWidth}px`
      );
      this.renderer.setStyle(ctxElement, 'top', `${top}px`);
      this.contextMenu = true;
    }
  }

  projectSelect(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const target = this.layoutService.convertEventToElement(e as Event);
      this.filter.projectTitle = (target as HTMLInputElement).value;
      this.getProjectLists();
    }
  }

  clearProject() {
    this.filter.projectTitle = '';
    this.getProjectLists();
  }

  goToAdd() {
    this.router.navigate(['project', 'create']);
  }

  openModal() {
    this.modalService.append('delete', this.deleteModal.nativeElement)
    this.modalService.show('delete')
  }

  deleteProject(e : MouseEvent) {
    
  }
}
