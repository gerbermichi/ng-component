import {
  Component, Input, OnChanges, OnInit, SimpleChanges, QueryList, ViewChildren, Directive,
  AfterContentInit, AfterViewInit, AfterViewChecked, ContentChildren, ContentChild, TemplateRef
} from "@angular/core";
import {Observable} from "rxjs";

@Directive({
  selector: '[mgItem]'
})
export class MgItem{

  constructor(public templateRef:TemplateRef<MgList>){
  }
}

@Component({
  selector: 'mg-list',
  template: `
    <h1>mg-list</h1>
    
    <div *ngFor="let item of data | async">
      <ng-template  [ngTemplateOutlet]="templateOutlet" [ngOutletContext]="{$implicit: this.item}" ></ng-template>
    </div>
  `
})
export class MgList implements AfterContentInit {
  @Input('data') data: Observable<string>;

  @ContentChildren(MgItem) items: QueryList<MgItem>;

  templateOutlet;

  ngAfterContentInit() {
    this.templateOutlet = this.items.first.templateRef;
  }
}
