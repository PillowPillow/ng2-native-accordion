var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Input, Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { State } from '../consts/state';
import { AccordionStyle } from '../consts/accordionStyle';
export var Accordion = (function () {
    function Accordion() {
        this.classes = {};
        this.optStyle = {};
        this._duration = 300;
        this.timers = [];
        this.stateChange = new EventEmitter();
        this.classes[State.Open] = true;
        this.classes[State.Collapsing] = false;
        this.classes[State.Collapsed] = false;
        this.optStyle[AccordionStyle.Duration] = this._duration + "ms";
    }
    Object.defineProperty(Accordion.prototype, "collapse", {
        set: function (value) { this.toggle(value); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Accordion.prototype, "duration", {
        set: function (duration) {
            this._duration = duration || this._duration;
            this.optStyle[AccordionStyle.Duration] = this._duration + "ms";
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Accordion.prototype, "contentNode", {
        get: function () { return this.content.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "contentHeight", {
        get: function () { return this.contentNode.getBoundingClientRect().height; },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.open = function () {
        var _this = this;
        this.optStyle[AccordionStyle.Height] = 0;
        this.classes[State.Collapsed] = false;
        this.classes[State.Collapsing] = this.classes[State.Open] = true;
        this.optStyle[AccordionStyle.Height] = 0;
        var timer = setTimeout(function () { return _this.optStyle[AccordionStyle.Height] = _this.contentHeight; }, 1);
        this.timers.push(timer);
        timer = setTimeout(function () {
            delete _this.optStyle[AccordionStyle.Height];
            _this.classes[State.Collapsing] = false;
            _this.stateChange.emit(true);
        }, this._duration);
        this.timers.push(timer);
    };
    Accordion.prototype.close = function () {
        var _this = this;
        this.optStyle[AccordionStyle.Height] = this.contentHeight;
        this.classes[State.Open] = false;
        this.classes[State.Collapsing] = true;
        var timer = setTimeout(function () { return _this.optStyle[AccordionStyle.Height] = 0; }, 1);
        this.timers.push(timer);
        timer = setTimeout(function () {
            delete _this.optStyle[AccordionStyle.Height];
            _this.classes[State.Collapsing] = false;
            _this.classes[State.Collapsed] = true;
            _this.stateChange.emit(false);
        }, this._duration);
        this.timers.push(timer);
    };
    Accordion.prototype.resetTimers = function () {
        this.timers.forEach(function (timer) { return clearTimeout(timer); });
        this.timers = [];
    };
    Accordion.prototype.toggle = function (state) {
        if (state === void 0) { state = null; }
        if (this.classes[State.Open] && state === true)
            return;
        if (this.classes[State.Collapsed] && state === false)
            return;
        this.resetTimers();
        if (this.classes[State.Open])
            this.close();
        else
            this.open();
    };
    __decorate([
        ViewChild('accordionContent')
    ], Accordion.prototype, "content", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "collapse", null);
    __decorate([
        Output()
    ], Accordion.prototype, "stateChange", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "duration", null);
    Accordion = __decorate([
        Component({
            selector: 'accordion',
            template: "\n\t\t<section [ngClass]=\"classes\" [ngStyle]=\"optStyle\" class=\"accordion-container\">\n\t\t\t<article #accordionContent>\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</article>\n\t\t</section>\n\t",
            styles: [("\n\t\t.accordion-container {\n\t\t\ttransition-property: height;\n\t\t\ttransition-timing-function: ease-in;\n\t\t}\n\t\t." + State.Collapsed + " {\n\t\t\tdisplay:none;\n\t\t}\n\t\t." + State.Collapsing + " {\n\t\t\toverflow:hidden;\n\t\t}\n\t")]
        })
    ], Accordion);
    return Accordion;
}());
//# sourceMappingURL=accordion.js.map