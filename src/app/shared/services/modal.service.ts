import { ElementRef, Injectable, Renderer2, RendererFactory2  } from '@angular/core';
import { keyable } from '../interface/keyable-interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  _body : HTMLElement = document.body;
  _modal : keyable = {}
  _wrapper : HTMLElement;
  private renderer : Renderer2
  constructor(private rendererFactory : RendererFactory2) {  
    this.renderer = this.rendererFactory.createRenderer(null, null)
    const wrapper = this.renderer.createElement('div')
    this.renderer.addClass(wrapper, 'wrapper')
    this._wrapper = wrapper;
  }

  

  create(modalName : string, className : string[] = [], size : string = 'medium') {
    const div = this.renderer.createElement('div')
    const header = this.renderer.createElement('div');
    const closeIcon = this.renderer.createElement('i');

    this.renderer.addClass(closeIcon, 'close');
    this.renderer.addClass(closeIcon, 'icon');
    this.renderer.listen(closeIcon, "click", ()=> {
      this.hide(modalName)
    })

    this.renderer.appendChild(header, closeIcon);
    this.renderer.appendChild(div, header)



    this.renderer.addClass(div, 'modal')
    className.forEach(name => {
      this.renderer.addClass(div, name)
    })
    switch(size) {
      case 'small':
        this.renderer.addClass(div, 'sm')
        break;
      case 'medium':
        this.renderer.addClass(div, 'md')
        break;
      case 'large':
        this.renderer.addClass(div, 'lg')
        break;
      default:
        this.renderer.addClass(div, 'md')
        break;
    }
    this._modal[modalName] = div;
    return this    
  }

  append(modalName : string, child : any) {
    this.renderer.appendChild(this._modal[modalName], child)
    return this;
  }

  show(modalName: string, config? : keyable) {
    this.renderer.appendChild(this._body, this._modal[modalName])
    if( config.isWrapper ) {
      this.renderer.appendChild(this._body, this._wrapper)
    }
    
  }

  hide(modalName: string, config? : keyable) {
    this.renderer.removeChild(this._body, this._modal[modalName])
      if( config.isWrapper ) {
        this.renderer.removeChild(this._body, this._wrapper)
      }
  }


}
