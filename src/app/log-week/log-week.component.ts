import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Sleep } from '../sleep';
import { Observable }        from 'rxjs/Observable';

import * as Immutable from 'immutable';
import * as moment from 'moment';

@Component({
  selector: 'log-week',
  templateUrl: './log-week.component.html',
  styleUrls: ['./log-week.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogWeekComponent implements OnInit, OnChanges {

  @Input() date: string;
  @Input() days: Map<string, Map<number, Sleep>>;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  	//console.log('Init week');
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}