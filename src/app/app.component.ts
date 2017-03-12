import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  data = new Subject<Array<string>>();

  public ngOnInit() {
    setTimeout(() => {
      this.data.next(['hello', 'world']);
    }, 100);
  }
}
