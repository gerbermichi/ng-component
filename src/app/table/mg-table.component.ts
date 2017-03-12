import {
  Component, Input, QueryList, Directive, AfterContentInit, ContentChildren, TemplateRef,
  EventEmitter, Output
} from "@angular/core";
import {Observable} from "rxjs";
@Directive({
  selector: '[mgColumnTemplate]'
})
export class MgColumnTemplate {
  constructor(public templateRef: TemplateRef<MgTable>) {
  }

  @Input('property') property: string
}

@Directive({
  selector: 'mg-column'
})
export class MgColumn {

  @Input('header') header: string;
  @Input('property') property: string;

  @ContentChildren(MgColumnTemplate) templates: QueryList<MgColumnTemplate>;

  hasTemplate(): boolean {
    return this.templates.length > 0;
  }

  get template(): MgColumnTemplate {
    return this.templates.first;
  }
}

@Component({
  selector: 'mg-table',
  template: `
    <h1>mg-table</h1>
    
    <input type="search" [ngModel]="q" (ngModelChange)="qChange.emit($event)"/>
    
    <table>
      <tr>
        <th *ngFor="let column of columns">{{column.header}}</th>
      </tr>
      <tr *ngFor="let row of data | async; let i = index">
        <td *ngFor="let column of columns">
          <span *ngIf="!column.hasTemplate()">{{row[column.property]}}</span>
          <ng-template *ngIf="column.hasTemplate()" [ngTemplateOutlet]="column.template.templateRef" [ngOutletContext]="{$implicit: row[column.property], index:i}" ></ng-template>
        </td>
      </tr>
    </table>
    
  `
})
export class MgTable implements AfterContentInit {
  @Input('data') data: Observable<string>;

  @Input('q') q;
  @Output('qChange') qChange = new EventEmitter();

  @ContentChildren(MgColumn) columns: QueryList<MgColumn>;

  ngAfterContentInit() {
  }
}
