import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

export class Person {
    constructor(public firstName: string, public lastName: string, public email = '') {

    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    data = new Subject<Array<string>>();
    tableData = new Subject<Array<Person>>();

    ngOnInit() {
        setTimeout(() => {
            this.data.next([ 'hello', 'world' ]);
            this.tableData.next([ new Person('Michi', 'Gerber'), new Person('Lisa', 'Aeschlimann') ]);
        }, 100);
    }

    update(q: string) {

        const fake = [];

        for (let i = 0; i < 100; i++) {
            fake.push(new Person(q.split(' ')[ 0 ], q.split(' ')[ 1 ], 'info@test.ch'));
        }

        this.tableData.next(fake);
    }

}
