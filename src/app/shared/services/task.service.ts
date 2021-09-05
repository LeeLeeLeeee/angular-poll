import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import restApi from '../interface/restApi-interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements restApi{
  private _taskId : string = '';
  
  constructor(private httpClient: HttpClient) { }

  get id() {
    return this._taskId
  }

  set id(id : string) {
    this._taskId = id;
  }

  select(projectId : any) : Promise<any> {
    const params = new HttpParams({fromString: `projectId=${projectId}&page_size=100`});
    
    return this.httpClient.get<any>(`${environment.apiAddres}/v1/task`, {
      withCredentials: true,
      params
    }).toPromise()
  }

  create<T>(taskForm: T): Observable<T> {
    return this.httpClient.post<T>(
      `${environment.apiAddres}/v1/task`,
      taskForm,
      {
        withCredentials: true
      }
    )
  }

  delete() : Promise<any> {
    if(this._taskId !== '') {
      return this.httpClient.delete(`${environment.apiAddres}/v1/task/${this._taskId}`, {
        withCredentials: true,
      })
      .pipe(
        catchError((e)=> {
          return of([]);
        })
      )
      .toPromise()
    } else {
      return Promise.reject('no id')
    }
    
  }
}
