import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import * as moment from 'moment';
import * as _ from 'lodash';

import { UpdateStreamService } from '../update-stream.service';

import { Sleep } from '../sleep';
import { SleepService } from '../sleep.service';

const SleepList = gql`
  query SleepList {
    sleepList {
      id
      preSleep
      sleep
      wakeUp
    }
  }
`;

const pingRepository = gql`
  mutation pingRepository($changed: Boolean) {
    triggerChange(changed: $changed) {
    	id
    }
  }
`;

const onSleepUpdate = gql`
	subscription onSleepUpdate($type: Int!){
	  sleepUpdated(type: $type){
	      id
	      preSleep
	      sleep
	      wakeUp
	  }
	}
`;

interface QueryResponse {
  sleepList: Sleep[],
  loading
}

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [SleepService],
})

export class GraphComponent implements OnInit {
	sleeps: Observable<any>;
	loading: boolean;
	orderBy: String;
	polyfillMsg: String;
	clickCount: String[];

	constructor(private sleepService: SleepService, private apollo: Apollo, private updateStreamService: UpdateStreamService) { }

	ngOnInit(): void {
		this.orderBy = 'id';

		this.sleeps = this.apollo.watchQuery<QueryResponse>({
	      query: SleepList
	    }).map(({data}) => {
			let grouped = _.groupBy(data.sleepList, (item) => moment(item.sleep).format('YYYY MMM'));
			let groupedMap = new Map<string, Sleep[]>(Object.keys(grouped).map(k => [k, grouped[k]] as [string, Sleep[]]));
			return groupedMap;
	    });

	    this.updateStreamService.messages().filter(e => e.type === 'sleep')
			.map(e => e.data)
			.subscribe(e => this.pingRepository(e));
	}

	setOrderBy(value) {
		this.orderBy = value;
	}

	pingRepository(sleep) {
		console.log('Streamed Graph event data', sleep);

		this.apollo.mutate({
			mutation: pingRepository,
			variables: {
		      	changed: true
		    },
		    optimisticResponse: {
		    	__typename: 'Mutation',
          		triggerChange: {
            		__typename: "Sleep",
            		id: "foo"
          		},
        	},
        	update: (store, { data: { submitComment } }) => {
        		
				const data = store.readQuery({ query: SleepList });
				let i = data["sleepList"].findIndex(item => item.id === sleep.id);

				if(i !== -1) {
					data["sleepList"][i] = Object.assign({
						__typename: "Sleep"
					}, sleep);

					store.writeQuery({ query: SleepList, data });
				}
          	}
		}).subscribe();
	}
}
