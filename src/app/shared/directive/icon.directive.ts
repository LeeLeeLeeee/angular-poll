import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

interface COLOR_TYPE {

}

@Directive({
  selector: '[bgIcon]'
})
export class IconDirective implements OnInit {

  @Input('bgIcon') name: string = "";
  @Input() size: number = 24;
  @Input() color: string = 'black';

  private mapIcon: Object = {
    leftArrow: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path  d="M15.41 18.58L10.83 14L15.41 9.41L14 8L8 14L14 20L15.41 18.58Z" fill="#474747"/>
      </svg>
    `,
    edit: `
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.625 23.3929L15.6929 23.3722L28.9369 10.2547C29.4566 9.73499 29.7426 9.04474 29.7426 8.31049C29.7426 7.57624 29.4566 6.88599 28.9369 6.36624L26.7561 4.18549C25.7166 3.14599 23.903 3.15149 22.8717 4.18136L9.625 17.3016V23.3929ZM24.8119 6.12974L26.9967 8.30636L24.8009 10.4816L22.6201 8.30224L24.8119 6.12974ZM12.375 18.4484L20.6662 10.2355L22.847 12.4162L14.5571 20.6264L12.375 20.6332V18.4484Z" fill="black"/>
      <path d="M6.875 28.875H26.125C27.6416 28.875 28.875 27.6416 28.875 26.125V14.2065L26.125 16.9565V26.125H11.2172C11.1815 26.125 11.1444 26.1388 11.1086 26.1388C11.0633 26.1388 11.0179 26.1264 10.9711 26.125H6.875V6.875H16.2896L19.0396 4.125H6.875C5.35837 4.125 4.125 5.35837 4.125 6.875V26.125C4.125 27.6416 5.35837 28.875 6.875 28.875Z" fill="black"/>
    </svg>
    `,
    delete: `
      <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path  d="M27.8438 8.25H23.7188V5.67188C23.7188 4.53428 22.7938 3.60938 21.6562 3.60938H11.3438C10.2062 3.60938 9.28125 4.53428 9.28125 5.67188V8.25H5.15625C4.58584 8.25 4.125 8.71084 4.125 9.28125V10.3125C4.125 10.4543 4.24102 10.5703 4.38281 10.5703H6.3293L7.12529 27.4248C7.17686 28.5237 8.08564 29.3906 9.18457 29.3906H23.8154C24.9176 29.3906 25.8231 28.527 25.8747 27.4248L26.6707 10.5703H28.6172C28.759 10.5703 28.875 10.4543 28.875 10.3125V9.28125C28.875 8.71084 28.4142 8.25 27.8438 8.25ZM21.3984 8.25H11.6016V5.92969H21.3984V8.25Z" fill="#FF8080"/>
      </svg>
    `,
    dashboard: `
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M24.7499 21.6562H26.8124V26.8125H24.7499V21.6562Z" fill="black"/>
      <path  d="M20.6248 16.5H22.6873V26.8125H20.6248V16.5Z" fill="black"/>
      <path  d="M11.344 26.8125C9.97697 26.8109 8.66641 26.2671 7.69978 25.3005C6.73315 24.3338 6.18938 23.0233 6.18774 21.6562H8.25024C8.25024 22.2681 8.43169 22.8663 8.77164 23.375C9.11158 23.8838 9.59476 24.2803 10.1601 24.5145C10.7254 24.7487 11.3474 24.8099 11.9476 24.6906C12.5477 24.5712 13.0989 24.2765 13.5316 23.8439C13.9643 23.4112 14.2589 22.8599 14.3783 22.2598C14.4977 21.6597 14.4364 21.0376 14.2022 20.4723C13.9681 19.907 13.5716 19.4238 13.0628 19.0839C12.554 18.7439 11.9559 18.5625 11.344 18.5625V16.5C12.7115 16.5 14.023 17.0432 14.99 18.0102C15.957 18.9772 16.5002 20.2887 16.5002 21.6562C16.5002 23.0238 15.957 24.3353 14.99 25.3023C14.023 26.2693 12.7115 26.8125 11.344 26.8125Z" fill="black"/>
      <path  d="M28.8751 2.0625H4.12506C3.57822 2.06305 3.05393 2.28052 2.66726 2.6672C2.28058 3.05387 2.06311 3.57816 2.06256 4.125V28.875C2.06311 29.4218 2.28058 29.9461 2.66726 30.3328C3.05393 30.7195 3.57822 30.937 4.12506 30.9375H28.8751C29.4218 30.9367 29.9459 30.7191 30.3326 30.3325C30.7192 29.9459 30.9367 29.4218 30.9376 28.875V4.125C30.937 3.57816 30.7195 3.05387 30.3329 2.6672C29.9462 2.28052 29.4219 2.06305 28.8751 2.0625ZM28.8751 11.3438H14.4376V4.125H28.8751V11.3438ZM12.3751 4.125V11.3438H4.12506V4.125H12.3751ZM4.12506 28.875V13.4062H28.8751L28.8771 28.875H4.12506Z" fill="black"/>
    </svg>
    `,
    config: `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1.5L6.75 3.75H3.75V6.75L1.5 9L3.75 11.25V14.25H6.75L9 16.5L11.25 14.25H14.25V11.25L16.5 9L14.25 6.75V3.75H11.25L9 1.5Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
    </svg>
    `,
    download:`
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.28125 0H12.7188C13.2902 0 13.75 0.459766 13.75 1.03125V8.25H17.5184C18.2832 8.25 18.6656 9.17383 18.1242 9.71523L11.5887 16.2551C11.2664 16.5773 10.7379 16.5773 10.4156 16.2551L3.87148 9.71523C3.33008 9.17383 3.7125 8.25 4.47734 8.25H8.25V1.03125C8.25 0.459766 8.70977 0 9.28125 0ZM22 16.1562V20.9688C22 21.5402 21.5402 22 20.9688 22H1.03125C0.459766 22 0 21.5402 0 20.9688V16.1562C0 15.5848 0.459766 15.125 1.03125 15.125H7.33477L9.44023 17.2305C10.3039 18.0941 11.6961 18.0941 12.5598 17.2305L14.6652 15.125H20.9688C21.5402 15.125 22 15.5848 22 16.1562ZM16.6719 19.9375C16.6719 19.4648 16.2852 19.0781 15.8125 19.0781C15.3398 19.0781 14.9531 19.4648 14.9531 19.9375C14.9531 20.4102 15.3398 20.7969 15.8125 20.7969C16.2852 20.7969 16.6719 20.4102 16.6719 19.9375ZM19.4219 19.9375C19.4219 19.4648 19.0352 19.0781 18.5625 19.0781C18.0898 19.0781 17.7031 19.4648 17.7031 19.9375C17.7031 20.4102 18.0898 20.7969 18.5625 20.7969C19.0352 20.7969 19.4219 20.4102 19.4219 19.9375Z" fill="black"/>
    </svg>
    `,
    table:`
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.66665 19.25H18.2352C19.2463 19.25 20.0686 18.4278 20.0686 17.4167V4.58333C20.0686 3.57225 19.2463 2.75 18.2352 2.75H3.66665C2.65556 2.75 1.83331 3.57225 1.83331 4.58333V17.4167C1.83331 18.4278 2.65556 19.25 3.66665 19.25ZM3.66665 17.4167V12.8333H7.33331V17.4167H3.66665ZM12.8333 6.41667V11H9.16665V6.41667H12.8333ZM7.33331 6.41667V11H3.66665V6.41667H7.33331ZM9.16665 17.4167V12.8333H12.8333V17.4167H9.16665ZM14.6666 17.4167V12.8333H18.2361V17.4167H14.6666ZM18.2352 11H14.6666V6.41667H18.2352V11Z" fill="black"/>
    </svg>
    `
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const iconElement = this.getIcon(this.name);
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, iconElement)
  }

  
  
  private getIcon(name: string): ChildNode {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.mapIcon[name],'text/html');
    const icon = doc.body.firstChild;
    
    (icon as HTMLElement).querySelectorAll('path').forEach((ele) => {
      if(ele.getAttribute('fill') !== null) {
        this.renderer.setAttribute(ele, 'fill', this.getColor());
      } else if(ele.getAttribute('stroke') !== null){
        this.renderer.setAttribute(ele, 'stroke', this.getColor());
      }
    })

    this.renderer.setAttribute(icon, 'width', `${this.size}`);
    this.renderer.setAttribute(icon, 'height', `${this.size}`);
    // this.renderer.setAttribute(icon, 'viewBox', `0 0 ${this.size} ${this.size}`);
    this.renderer.setStyle(icon, 'position', 'absolute');
    this.renderer.setStyle(icon, 'left', '50%');
    this.renderer.setStyle(icon, 'top', '50%');
    this.renderer.setStyle(icon, 'transform', 'translate(-50%, -50%)');
    return icon
  }

  private getColor(): string {
    const mapColor = {
      black: 'black',
      danger:'#ff8080',
      primary:'#2284f0',
      success:'#22c55e',
      dark:'#474747',
      gray:'#828282'
    }
    return mapColor[this.color];
  }

}
