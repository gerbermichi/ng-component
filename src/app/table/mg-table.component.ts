import {AfterContentInit, Component, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

@Directive({
    selector: '[mgColumnTemplate]'
})
export class MgColumnTemplateDirective {
    constructor(public templateRef: TemplateRef<MgTableComponent>) {
    }
}

@Directive({
    selector: 'mg-column'
})
export class MgColumnDirective {

    @Input('header') header: string;
    @Input('property') property: string;

    @ContentChildren(MgColumnTemplateDirective) templates: QueryList<MgColumnTemplateDirective>;

    hasTemplate(): boolean {
        return this.templates.length > 0;
    }

    get template(): MgColumnTemplateDirective {
        return this.templates.first;
    }
}

@Component({
    selector: 'mg-table',
    styleUrls: ['./mg-table.component.css'],
    template: `
        <h1>mg-table</h1>
        
        <input type="search" [ngModel]="q" (ngModelChange)="qChange.emit($event)"/>
        
        <table>
          <thead>
              <th *ngFor="let column of columns">{{column.header}}</th>
          </thead>
          <tbody>
            <tr *ngFor="let row of data | async; let i = index">
              <td *ngFor="let column of columns">
                <span *ngIf="!column.hasTemplate()">{{row[column.property]}}</span>
                <ng-template *ngIf="column.hasTemplate()" [ngTemplateOutlet]="column.template.templateRef" [ngOutletContext]="{$implicit: row[column.property], index:i}" ></ng-template>
              </td>
            </tr>
          </tbody>
        </table> 

      `
})
export class MgTableComponent {

    @Input('data') data: Observable<string>;

    @Input('q') q;
    @Output('qChange') qChange = new EventEmitter();

    @ContentChildren(MgColumnDirective) columns: QueryList<MgColumnDirective>;

}
