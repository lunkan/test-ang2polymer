import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output()
  onModalInit:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
	const intf:object = {
		test: 'oh my'
	};

  	this.onModalInit.emit(intf);
  }

}
