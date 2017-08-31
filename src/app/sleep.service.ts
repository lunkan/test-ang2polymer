import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { UpdateStreamService } from './update-stream.service';

import { Sleep } from './sleep';
import { SLEEPS } from './mock-sleeps';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/concat';

@Injectable()
export class SleepService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private sleepUrl = 'api/sleep';  // URL to web api
	private sleepItems: Sleep[];
	//private sleepStream: Observable<any>

	constructor(
		private http: Http,
		private updateStreamService: UpdateStreamService
	) {

		/*if (typeof(Worker) !== "undefined") {
		    // Yes! Web worker support!
		    console.log('Webworker: WORKS!');
		    let w = new Worker("/assets/workers/demo.js");

		    w.onmessage = function(event){
			    console.log('Webworker:event ', event.data);
			    w.terminate();
			    w = undefined;
			};

			w.postMessage({wData: "some data"});

		} else {
		    // Sorry! No Web Worker support..
		    console.log('Webworker: SORRY!');
		}*/

		this.updateStreamService.messages().filter(e => e.type === 'sleep')
			.map(e => e.data)
			.subscribe(e => console.log('Streamed event data', e));
	}

    stream(): Observable<Sleep> {
		let updateStream = this.updateStreamService.messages()
			.map(e => {
				return e;
			})
			.filter(e => e.type === 'sleep')
			.map(e => e.data as Sleep);

        return this.http.get(this.sleepUrl)
            .mergeMap(response => response.json().data as Sleep[])
			.concat(updateStream);
    }

	getSleep(id: number): Promise<Sleep> {
		return this.getSleepList()
             .then(sleeps => sleeps.find(sleep => sleep.id == id));
    }

	getSleepList(): Promise<Sleep[]> {
		return this.http.get(this.sleepUrl)
             .toPromise()
             .then(response => this.sleepItems = response.json().data as Sleep[])
             .catch(this.handleError);
	}

	update(sleep:Sleep):Promise<any> {
		return this.http.put(`api/sleep/${sleep.id}`, JSON.stringify(sleep), {headers: this.headers})
			.toPromise()
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}