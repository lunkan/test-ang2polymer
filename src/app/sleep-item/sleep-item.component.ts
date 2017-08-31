import { Component, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Sleep } from '../sleep';

@Component({
  selector: '[sleep-item]',
  templateUrl: './sleep-item.component.html',
  styleUrls: ['./sleep-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SleepItemComponent {
	@Input() sleep: Sleep;
  @HostBinding('class.changed') hasChanged: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

	ngOnChanges(...args: any[]) {
    
    this.hasChanged = true;
    setTimeout (() => {
      this.hasChanged = false;
      this.cd.markForCheck();
    }, 10);

   } 
}