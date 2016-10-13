import { ElementRef, EventEmitter } from '@angular/core';
import { StateClassI } from '../interfaces/stateClass';
import { AccordionStyleI } from '../interfaces/accordionStyle';
export declare class Accordion {
    protected classes: StateClassI;
    protected optStyle: AccordionStyleI;
    protected _duration: number;
    protected timers: any[];
    protected content: ElementRef;
    protected collapse: boolean;
    protected stateChange: EventEmitter<Boolean>;
    protected duration: number;
    private readonly contentNode;
    private readonly contentHeight;
    constructor();
    private open();
    private close();
    private resetTimers();
    toggle(state?: any): void;
}
