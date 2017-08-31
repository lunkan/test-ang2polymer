import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'dateMoment'
})
export class DateMomentPipe implements PipeTransform {

	transform(value: string, args: string): any {
		if (!value) return value;
		return moment(value).format(args);
  }

}