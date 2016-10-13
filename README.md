# ng2-native-accordion
###Angular2 accordion - no dependencies
=======================

#### Index:
* [Getting Started](#gstart)
* [Components](#components):
	* [Accordion](#c_accordion)
* [Modify and build](#modifBuild)

------------

### <a name="gstart">Getting Started</a>

1. Download the library using npm `npm install --save ng2-native-accordion`
2. Register the library in your module

	```typescript
	import {NgModule} from '@angular/core';
	import {BrowserModule} from '@angular/platform-browser';
	import {Ng2Accordion} from 'ng2-native-accordion';

	@NgModule({
		declarations: [...],
		imports: [
			BrowserModule,
			Ng2Accordion
		],
		bootstrap: [...]
	})
	export class AppModule {
	}

	```
	
	If you're using systemJS, you have to reference the umd version of the lib in your config.
	```` typescript
		System.config({
			map: { 
				...,
				'ng2-native-accordion': 'node_modules/ng2-native-accordion'
			},
			packages: {
				...,
				'ng2-native-accordion': {main: 'bundles/core.umd.js', defaultExtension: 'js'}
			}
		});
	````
	

3. Use the accordion component in your application

	```typescript
	import {Component} from '@angular/core';

	@Component({
		selector: 'foo',
		template: `
			<h2 (click)="accordionDom.toggle()">Basic usage</h2>
			<accordion #accordionDom>
				<section>random content</section>
			</accordion>
		`
	})
	export class FooComponent {}
	```

	```typescript
	import {Component} from '@angular/core';

	@Component({
		selector: 'foo',
		template: `
			<h2 (click)="toggle()">Basic usage</h2>
			<accordion [collapse]="isVisible">
				<section>random content</section>
			</accordion>
		`
	})
	export class FooComponent {
		
		isVisible:boolean = true;
		toggle() {
			this.isVisible = !this.isVisible;
		}
		
	}
	```

### <a name="components">Components</a>
--------------------

###<a name="c_accordion">`Accordion`</a>

##### Inputs:
- **collapse**:     boolean.   state.
- **duration**:     Serializable.   transition duration (ms).

##### Outputs:
- **stateChange**:     callback.

##### Exposed methods:
- **toggle**:     Function.   toggle the given accordion.

##### Usage:
````typescript
	import {Component} from '@angular/core';
	
	@Component({
		selector: 'foobar',
		template: `
			<button (click)="toggle()">collapse</button>
			<accordion [collapse]="collapsed" (stateChange)="log($event)">
				<section>content..</section>
			</accordion>
		`
	})
	export class FooBar {
		collapsed:boolean = true;
		log(value) {
			console.log('new state', value);
		}
		toggle() {
			this.collapsed = !this.collapsed;
		}
	}

````


````typescript
	import {Component} from '@angular/core';
	
	@Component({
		selector: 'foobar',
		template: `
			<h2 (click)="flag.toggle()">Custom duration</h2>
			<accordion [duration]="duration" #flag>
				<section>
					<input type="text" [(ngModel)]="duration">
				</section>
			</accordion>
		`
	})
	export class FooBar {
		duration:number = 300;
	}

````

### <a name="modifBuild">Modify and build</a>
--------------------

`npm install`

*Start the build process:* `npm run build`

*Start the dev server:* `npm run dev` then go to *http://localhost:8080/webpack-dev-server/index.html*

