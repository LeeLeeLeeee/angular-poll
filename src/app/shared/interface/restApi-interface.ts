import { Observable } from "rxjs";

export default interface restApi {
    select<T>(pageInfo?: any, param?: any) : Promise<T>
    create<T>(form: T) : Observable<T>
    delete() : Promise<any>
}