import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { projectForm } from 'src/app/layouts/project/project.component';
import { environment } from 'src/environments/environment';
import restApi from '../interface/restApi-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements restApi {

  constructor(private httpClient: HttpClient) {}


  getOne<T>(projectId : string): Promise<T> {
    return this.httpClient.get<T>(`${environment.apiAddres}/v1/project/${projectId}`, {
      withCredentials: true,
    }).toPromise();
  } 

  select<T>(pageInfo?: any): Promise<any> {
    const params = new HttpParams({ fromObject: pageInfo });

    return this.httpClient.get<T>(`${environment.apiAddres}/v1/project`, {
        withCredentials: true,
        params,
      }).toPromise();
  }

  create<T>(projectForm: T): Observable<T> {
    return this.httpClient.post<T>(
      `${environment.apiAddres}/v1/project`,
      projectForm,
      {
        withCredentials: true,
      }
    );
  }

  delete(id : string): Promise<any> {
    if( id !== "") {
      return this.httpClient
      .delete(`${environment.apiAddres}/v1/project/${id}`, {
        withCredentials: true,
      })
      .pipe(
        catchError((e) => {
          return of([]);
        })
      )
      .toPromise();
    } else {
      return Promise.reject('no id')
    }
    
  }
}
