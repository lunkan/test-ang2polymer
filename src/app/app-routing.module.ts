import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SleepComponent } from './sleep/sleep.component';
import { LogComponent } from './log/log.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
	{ path: '', redirectTo: '/log', pathMatch: 'full' },
	{ path: 'log', component: LogComponent, children: [
		{ path: 'edit/:id', component: SleepComponent }
	]},
	{ path: 'graph', component: GraphComponent, children: [
		{ path: 'edit/:id', component: SleepComponent }
	]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}