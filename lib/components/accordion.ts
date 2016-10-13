import {Input, Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {StateClassI} from '../interfaces/stateClass';
import {AccordionStyleI} from '../interfaces/accordionStyle';
import {State} from '../consts/state';
import {AccordionStyle} from '../consts/accordionStyle';

@Component({
	selector: 'accordion',
	template: `
		<section [ngClass]="classes" [ngStyle]="optStyle" class="accordion-container">
			<article #accordionContent>
				<ng-content></ng-content>
			</article>
		</section>
	`,
	styles: [`
		.accordion-container {
			transition-property: height;
			transition-timing-function: ease-in;
		}
		.${State.Collapsed} {
			display:none;
		}
		.${State.Collapsing} {
			overflow:hidden;
		}
	`]
})
export class Accordion {

	protected classes:StateClassI = <StateClassI>{};
	protected optStyle:AccordionStyleI = <AccordionStyleI>{};
	protected _duration:number = 300;
	protected timers = [];
	@ViewChild('accordionContent')
	protected content:ElementRef;

	@Input()
	protected set collapse(value:boolean) { this.toggle(value); };

	@Output()
	protected stateChange:EventEmitter<Boolean> = new EventEmitter();

	@Input()
	protected set duration(duration:number) {
		this._duration = duration || this._duration;
		this.optStyle[AccordionStyle.Duration] = `${this._duration}ms`;
	};

	private get contentNode():Node { return this.content.nativeElement; }

	private get contentHeight():number { return (<any>this.contentNode).getBoundingClientRect().height; }

	constructor() {
		this.classes[State.Open] = true;
		this.classes[State.Collapsing] = false;
		this.classes[State.Collapsed] = false;
		this.optStyle[AccordionStyle.Duration] = `${this._duration}ms`;
	}

	private open() {
		this.optStyle[AccordionStyle.Height] = 0;
		this.classes[State.Collapsed] = false;
		this.classes[State.Collapsing] = this.classes[State.Open] = true;
		this.optStyle[AccordionStyle.Height] = 0;

		let timer = setTimeout(() => this.optStyle[AccordionStyle.Height] = this.contentHeight, 1);
		this.timers.push(timer);
		timer = setTimeout(() => {
			delete this.optStyle[AccordionStyle.Height];
			this.classes[State.Collapsing] = false;
			this.stateChange.emit(true);
		}, this._duration);
		this.timers.push(timer);
	}

	private close() {
		this.optStyle[AccordionStyle.Height] = this.contentHeight;
		this.classes[State.Open] = false;
		this.classes[State.Collapsing] = true;

		let timer = setTimeout(() => this.optStyle[AccordionStyle.Height] = 0, 1);
		this.timers.push(timer);
		timer = setTimeout(() => {
			delete this.optStyle[AccordionStyle.Height];
			this.classes[State.Collapsing] = false;
			this.classes[State.Collapsed] = true;
			this.stateChange.emit(false);
		}, this._duration);
		this.timers.push(timer);
	}

	private resetTimers() {
		this.timers.forEach((timer) => clearTimeout(timer));
		this.timers = [];
	}

	public toggle(state = null) {
		if(this.classes[State.Open] && state === true) return;
		if(this.classes[State.Collapsed] && state === false) return;

		this.resetTimers();
		if(this.classes[State.Open])
			this.close();
		else
			this.open();
	}

}
