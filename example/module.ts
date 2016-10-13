import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Ng2Accordion} from './libwrapper';
import {App} from './components/app';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [App],
	imports: [
		BrowserModule,
		Ng2Accordion,
		FormsModule
	],
	bootstrap: [App],
})
export class AppModule {
}
