import { Injectable, TemplateRef } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  private _modals$ = new Subject<TemplateRef<any>>();
  private _modalStack:Array<TemplateRef<any>>;

  addModal(templateRef:TemplateRef<any>) {
  	this._modals$.next(templateRef);
  }

  removeModal() {
    this._modals$.next(null);
  }

  getModals$() {
  	return this._modals$.asObservable();
  }

}
