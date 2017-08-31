import { Pipe, PipeTransform } from '@angular/core';

export class MapEntry {
	key: any;
	value: any;

	constructor(key:any) {
		this.key = key;
	}
}

@Pipe({
	name: 'mapEntries'
})
export class MapEntriesPipe implements PipeTransform {

	private entries:Map<any, MapEntry>;

	nextEntry(key, value) {
		const entry = this.getEntryByKey(key);
		entry.value = value;
		return entry;
	}

	getEntryByKey(key) {
		if(!this.entries) {
			this.entries = new Map<any, MapEntry>();
		}

		if(!this.entries.has(key)) {
			const entry = new MapEntry(key);
			this.entries.set(key, entry);
			return entry;
		} else {
			return this.entries.get(key);
		}
	}

	transform(value: Map<any, any>, args: string[]): any {
		if (!value) return value;

		var entries = [];
		for (let entry of Array.from(value.entries())) {
			entries.push(this.nextEntry(entry[0], entry[1]));
		}

		return entries;
  }

}