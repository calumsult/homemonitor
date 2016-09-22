import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
//import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class MonitorService {
    constructor(private http: Http){}
    
    private monitorUrl: string = 'http://calumsult.homemonitor.s3.amazonaws.com/homemonitor.txt';

    getData(): Observable<string> {
        return this.http.get(this.monitorUrl)
            .map(this.extractData) 
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.text();
        return body.toString() || '';
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
  }
}
