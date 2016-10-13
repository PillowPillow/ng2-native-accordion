Error.stackTraceLimit = Infinity;

require('core-js');
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

require('rxjs/Rx');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
	browser.BrowserDynamicTestingModule,
	browser.platformBrowserDynamicTesting()
);

Object.assign(global, testing);

var context = require.context('../lib', true, /\.spec\.ts/);

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

var modules = requireAll(context);