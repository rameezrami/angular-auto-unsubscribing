import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  name = 'Angular ' + VERSION.major;
  status = true;

  ngOnInit() {}
  ngOnDestroy() {}

  toggle() {
    this.status = !this.status;
  }
}
