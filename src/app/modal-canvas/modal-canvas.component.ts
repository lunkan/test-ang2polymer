import { Component, OnInit, ViewChild, HostBinding, ViewContainerRef } from '@angular/core';
import { ModalService } from '../modal.service';
import { SleepComponent } from '../sleep/sleep.component';

export class FooTemplateContext {
  constructor(public description: string) {}
}

@Component({
  selector: 'app-modal-canvas',
  templateUrl: './modal-canvas.component.html',
  styleUrls: ['./modal-canvas.component.css']
})
export class ModalCanvasComponent implements OnInit {

  //@ViewChild('tpl') tpl;
  @ViewChild('tpl', {read: ViewContainerRef }) tpl: ViewContainerRef;
  @HostBinding('class.open') open: boolean = false;

  @ViewChild(SleepComponent)
  private sleepComponent: SleepComponent;

  constructor(private modalService: ModalService) {}
  
  /*ngAfterViewInit() {
    this._vcr.createEmbeddedView(this.tpl);
  }*/

  ngOnInit() {
  	/*this.modalService.getModals$().subscribe(templateRef => {
		this.vcr.createEmbeddedView(templateRef);
  	});*/
  }

  ngAfterViewInit() {
  	//this.vc.createEmbededView( this.extraTemplate, {} );
  	//console.log('AFTER');



  	this.modalService.getModals$().subscribe(templateRef => {
		//this.vcr.createEmbeddedView(templateRef;

		if(templateRef) {		
			let context = new FooTemplateContext('some description');

			this.tpl.createEmbeddedView(templateRef, context);//{$implicit: {option: 'some description'} });//this);
			console.log('ngAfterViewInit', this, templateRef);
			this.open = true;
		} else {
			this.tpl.clear();
			this.open = false;
		}
  	});
  }

}
