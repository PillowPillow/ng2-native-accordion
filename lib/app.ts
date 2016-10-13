import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Accordion} from './components/accordion';

export * from './components/accordion';

@NgModule({
	declarations: [Accordion],
	imports: [CommonModule],
	exports: [Accordion]
})
export class Ng2Accordion {
}
