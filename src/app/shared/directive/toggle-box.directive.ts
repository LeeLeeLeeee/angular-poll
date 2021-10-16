import { 
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
} from '@angular/core';

import { ToggleComponent } from '../components/toggle/toggle.component';

@Directive({
  selector: '[appToggleBox]'
})
export class ToggleBoxDirective implements OnDestroy {
  @Input() content : string = "";
  

  toggleComponent : ComponentFactory<ToggleComponent>;
  ref : ComponentRef<ToggleComponent>
  active : boolean = false;
  rootChild : any = '';

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private cfResolver: ComponentFactoryResolver,
    private vcRef : ViewContainerRef,
  ) {}

  ngOnInit() {
    this.rootChild = this.el.nativeElement.firstElementChild
    let rootHeight = 0;
    const wrapper = this.renderer.createElement('div');
    const wrapperTitle = this.renderer.createText(this.content);
    
    this.toggleComponent = this.cfResolver.resolveComponentFactory(ToggleComponent);
    this.ref = this.vcRef.createComponent(this.toggleComponent);
    
    

    this.renderer.setStyle(wrapper, 'height', '41px')
    this.renderer.setStyle(wrapper, 'display', 'flex')
    this.renderer.setStyle(wrapper, 'justify-content', 'space-between')
    this.renderer.setStyle(wrapper, 'align-items', 'center')
    this.renderer.setStyle(wrapper, 'border-bottom', '1px solid #eeeeee')
    this.renderer.setStyle(wrapper, 'padding', '12px')

    this.renderer.appendChild(wrapper, wrapperTitle)
    this.renderer.appendChild(wrapper, this.ref.location.nativeElement)
    this.renderer.insertBefore(this.el.nativeElement, wrapper, this.rootChild);

    if(this.rootChild) {
      rootHeight = this.rootChild.getBoundingClientRect().height;
      this.renderer.setStyle(this.rootChild, 'overflow', 'hidden');
      this.renderer.setStyle(this.rootChild, 'max-height', '0px');
      this.renderer.setStyle(this.rootChild, 'transition', 'max-height .25s ease-out');
    }
    
    
    this.ref.instance.toggleEvent.subscribe((_) => {
        this.active = !this.active
        if(this.active) {
          this.renderer.setStyle(wrapper, 'color','#2284f0')
          this.rootChild && this.renderer.setStyle(this.rootChild, 'max-height', `${rootHeight}px`);
        } else {
          this.renderer.setStyle(wrapper, 'color','black')
          this.rootChild && this.renderer.setStyle(this.rootChild, 'max-height', '0px');
        }
        this.ref.instance.toggleStatus = this.active;
    })
  }


  ngOnDestroy() {
    this.ref.destroy()
  }
}
