import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Sleep } from '../sleep';
import { Observable }        from 'rxjs/Observable';

import * as Immutable from 'immutable';
import * as moment from 'moment';

@Component({
  selector: 'log-day',
  templateUrl: './log-day.component.html',
  styleUrls: ['./log-day.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogDayComponent implements OnInit, OnChanges {

  @Input() date: string;
  @Input() items: Map<number, Sleep>;
  displayContent: boolean;

  constructor() { }

  ngOnInit() {
  	console.log('Init day');
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onClick(event: MouseEvent) {
  	this.displayContent = !this.displayContent;
  }


}
