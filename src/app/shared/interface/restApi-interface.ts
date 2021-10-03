import { Observable } from "rxjs";

export default interface restApi {
    getOne<T>(id: string) : Promise<T>
    select<T>(pageInfo?: any, param?: any) : Promise<T>
    create<T>(form: T) : Observable<T>
    delete(id: string) : Promise<any>
}