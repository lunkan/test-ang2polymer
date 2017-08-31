import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import * as moment from 'moment';
import 'rxjs/add/operator/switchMap';

import { SleepService } from '../sleep.service';
import { Sleep } from '../sleep';

class SleepForm {
  src: Sleep;
  date: string;
  preSleep: string;
  sleep: string;
  wakeUp: string;

  constructor(sleep:Sleep) {
  	this.src = sleep;
  	this.date = moment(sleep.sleep).format("YYYY-MM-DD");
  	this.preSleep = moment(sleep.preSleep).format("HH:mm");
  	this.sleep = moment(sleep.sleep).format("HH:mm");
  	this.wakeUp = moment(sleep.wakeUp).format("HH:mm");
  }

  parse() {
  	const out:Sleep = Object.assign(Object.create(this.src), this.src);//clone
  	out.preSleep = moment(this.date + " " + this.preSleep, 'YYYY-MM-DD HH:mm').format();
  	out.sleep = moment(this.date + " " + this.sleep, 'YYYY-MM-DD HH:mm').format();
  	out.wakeUp = moment(this.date + " " + this.wakeUp, 'YYYY-MM-DD HH:mm').format();
  	return out;
  }
}

@Component({
  selector: 'sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css'],
})
export class SleepComponent implements OnInit {

	form: SleepForm;

	constructor(
		private sleepService: SleepService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
    //console.log('Hello', this);

		this.route.params
		    .switchMap((params: Params) => this.sleepService.getSleep(+params['id']))
		    .subscribe(sleep => this.initForm(sleep));
	}

	initForm(sleep:Sleep):void {
		this.form = new SleepForm(sleep);
	}

  onModalInit(event):void {
    //console.log('onModalInit', event);
  }

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.sleepService.update(this.form.parse()).then(() => {
      console.log('saved', this);
      this.location.back();
    }).catch(err => console.log('update Error', err));
	}
}