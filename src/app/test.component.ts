import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { AutoUnsubscribe } from './auto';
@Component({
  selector: 'test',
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
@AutoUnsubscribe({})
export class TestComponent implements OnDestroy, OnInit {
  @Input() name: string;

  public sub1$: Subscription = Subscription.EMPTY;
  observable$;
  ngOnInit() {
    this.observable$ = interval(1000);
    this.sub1$ = this.observable$.subscribe(x => console.log(x));
  }
  // ngOnInit() {}
  ngOnDestroy() {
    console.log('default ngOnDestroy');
  }
}
