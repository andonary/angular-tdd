import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  /**
   * WORK IN PROGRESS
   */
  getOne(): Observable<any> {
    return of(null);
  }
}
