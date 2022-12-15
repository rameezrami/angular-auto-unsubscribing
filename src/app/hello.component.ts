import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
interface AutoUnSubParams {
  varableName?: string;
  logs?: boolean;
}
function AutoUnSub() {
  return function(constructor) {
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function() {
      for (const prop in this) {
        const property = this[prop];
        if (typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }
      orig.apply();
    };
  };
}
@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{ name }}!</h1>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
@AutoUnSub()
export class HelloComponent implements OnDestroy, OnInit {
  @Input() name: string;

  public autoUnSub$: Subscription[] = [];
  sub1$;
  observable$;
  ngOnInit() {
    this.observable$ = interval(1000);
    this.sub1$ = this.observable$.subscribe(x => console.log(x));
    this.sub1$.unsubscribe();
  }
  ngOnDestroy() {
    console.log('default on ong detryo');
  }
}
