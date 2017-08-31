import { Directive, TemplateRef, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[appModalTransclude]'
})
export class ModalTranscludeDirective implements OnDestroy {

  constructor(private modalService: ModalService, tr:TemplateRef<any>, el: ElementRef, vc:ViewContainerRef) {
  	this.modalService.addModal(tr);
  }

  /*ngAfterViewInit() {
  	//this.vc.createEmbededView( this.extraTemplate, {} );
  	console.log('DIR ngAfterViewInit', this);
  }*/

  ngOnDestroy() {
  	console.log('destroy transcluder');
  	this.modalService.removeModal();
  }

}
