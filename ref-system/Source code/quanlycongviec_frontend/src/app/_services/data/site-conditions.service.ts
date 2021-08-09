import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, BehaviorSubject, from} from 'rxjs';
import {map, switchMap, take, delay} from 'rxjs/operators';

@Injectable()

export class SiteConditionsService {
    // _center = new BehaviorSubject<number[]>(null); // works
  // tslint:disable-next-line:variable-name
    _center = new BehaviorSubject<number[]>([41.49871231510167, -72.95581850473526]); // doesn't work
  // tslint:disable-next-line:variable-name
    _heading = new BehaviorSubject<number>(0);

    center$ = this._center.asObservable();
    heading$ = this._heading.asObservable();

    constructor() {
        // this.route.params.pipe(
        //   take(1),
        //   switchMap(params => this.getInitialCenter(+params.id))
        // ).subscribe(initialCenter => {
        //   this._center.next(initialCenter);
        // });
        this.getInitialCenter(0).subscribe(initialCenter => {
            this._center.next(initialCenter);
        });
    }

    getInitialCenter(reportId): Observable<number[]> {
        // would come from HTTP service
        const center = [41.49871231510167, -72.95581850473526];
        // @ts-ignore
      return from<number[]>([center]).pipe(delay(2000));
    }
}
