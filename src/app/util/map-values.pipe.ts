import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mapValues'
})
export class MapValuesPipe implements PipeTransform {

	transform(value: Map<any, any>, args: string[]): any {
		if (!value) return value;
		return Array.from(value.values());
  }

}