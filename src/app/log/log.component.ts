import { Component, OnInit } from '@angular/core';
import { Sleep } from '../sleep';
import { SleepService } from '../sleep.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import * as Immutable from 'immutable';
import * as moment from 'moment';

// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [SleepService],
})

export class LogComponent implements OnInit {
	sleeps: Sleep[];
	sleepLog: Observable<any>;
	selectedSleep: Sleep;

	constructor(private sleepService: SleepService) {}

	ngOnInit(): void {

		this.sleepLog = this.sleepService.stream().scan((acc, value) => {
			//console.log('Next:', value);
			const dayDate = moment(value.sleep).startOf('day').format();
			const weekDate = moment(value.sleep).startOf('week').format();

			const week = acc.get(weekDate) || Immutable.Map<string, Immutable.Map<number, Sleep>>();
			const day = week.get(dayDate) || Immutable.Map<number, Sleep>();

			const next = acc.set(weekDate, week.set(dayDate, day.set(value.id, value)));
			return next;

		}, Immutable.Map<string, Immutable.Map<string, Immutable.Map<number, Sleep>>>());
	}

	getSleeps(): void {
		this.sleepService.getSleepList().then(sleeps => this.sleeps = sleeps);
	}

	onSelect(sleep: Sleep): void {
		this.selectedSleep = sleep;
	}
}