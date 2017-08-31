import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const Socket = window['WebSocket'] || window['MozWebSocket'];

@Injectable()
export class UpdateStreamService {

	private subject = new Subject<any>();
	private streamUrl = 'ws://localhost:3000';
	private connection;

	constructor() {
		console.log('construct UpdateStreamService');
		const self = this;

		this.connection = new Socket(this.streamUrl);
		this.connection.onopen = function () {
			//connection is opened and ready to use
		};

		this.connection.onerror = function (error) {
			//an error occurred when sending/receiving data
		};

		this.connection.onmessage = function (message) {
			console.log('onmessage', JSON.parse(message.data), this.subject);
			self.subject.next(JSON.parse(message.data));
		};
	}

	messages(): Observable<any> {
		console.log('subscribe to messages');
		return this.subject.asObservable();
    }
}