import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { keyable } from '../interface/keyable-interface';
import restApi from '../interface/restApi-interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements restApi {
  private _taskId : string = '';
  
  constructor(private httpClient: HttpClient) { }

  get id() {
    return this._taskId
  }

  set id(id : string) {
    this._taskId = id;
  }

  getOne(taskId : string) : Promise<any> {
    return this.httpClient.get<any>(`${environment.apiAddres}/v1/task/${taskId}`, {
      withCredentials:true
    }).toPromise()
  }

  select(projectId: any, filter: keyable = {}) : Promise<any> {
    const params = new HttpParams({fromString: `projectId=${projectId}&page_size=100&taskTitle=${filter?.taskTitle || ''}`});
    console.log(params)
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

  delete(id : string) : Promise<any> {
    if(id !== '') {
      return this.httpClient.delete(`${environment.apiAddres}/v1/task/${id}`, {
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
