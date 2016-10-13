import {Component} from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<header>
			<h1>NG2 NATIVE ACCORDION</h1>
		</header>
		<section>
			<h2>Basic usage</h2>
			<button (click)="toggle()">collapse</button>
			<accordion [collapse]="collapsed" (stateChange)="log($event)">
				<section class="test-block height-200"></section>
			</accordion>
		</section>
		<section>
			<h2 (click)="accordion2.toggle()">Dynamic height</h2>
			<label for="id-100">
				100px
				<input id="id-100" type="radio" name="class" value="height-100" [(ngModel)]="className">
			</label>
			<label for="id-200">
				200px
				<input id="id-200" type="radio" name="class" value="height-200" [(ngModel)]="className">
			</label>
			<label for="id-300">
				300px
				<input id="id-300" type="radio" name="class" value="height-300" [(ngModel)]="className">
			</label>
			<accordion [duration]="300" #accordion2>
				<section class="test-block {{ className }}"></section>
			</accordion>
		</section>
		<section>
			<h2 (click)="accordion3.toggle()">Custom duration</h2>
			<accordion [duration]="duration" #accordion3>
				<section class="test-block height-100">
					<input type="text" [(ngModel)]="duration">
				</section>
			</accordion>
		</section>
	`
})
export class App {

	collapsed:boolean = true;
	duration:number = 300;
	className = 'height-100';

	log(value) {
		console.log('new state', value);
	}

	toggle() {
		this.collapsed = !this.collapsed;
	}
}
