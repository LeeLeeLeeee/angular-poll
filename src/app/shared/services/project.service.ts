import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectForm } from 'src/app/layouts/project/project.component';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  select(pageInfo : any) : Promise<any> {
    const params = new HttpParams({fromObject: pageInfo });
   
    return this.httpClient.get<any>(`${environment.apiAddres}/v1/project`, {
      withCredentials: true,
      params
    }).toPromise()
  }


  create(projectForm : projectForm) : Observable<projectForm> {
    return this.httpClient.post<projectForm>(`${environment.apiAddres}/v1/project`, projectForm, {
      withCredentials: true
    })
  }


}
