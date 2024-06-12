import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  protected ServerGetAll: string  = 'http://localhost:8080/coderio/services/getTareas';
  protected ServerUpdateTarea: string = 'http://localhost:8080/coderio/services/updateTarea';
  protected ServerDeleteTarea: string = 'http://localhost:8080/coderio/services/delateTarea/';
  protected ServerAddTarea: string = 'http://localhost:8080/coderio/services/addTarea';

  constructor(private httpClient: HttpClient) { }

  getAllTareas() {
    return this.httpClient.get<any[]>(this.ServerGetAll);
  }

  updateTarea(tarea:any){
    return this.httpClient.put<any>(this.ServerUpdateTarea,tarea);
  }

  deleteTarea(id:any){
    return this.httpClient.delete(this.ServerDeleteTarea + id);
  }

  addTarea(tarea:any){
    return this.httpClient.post<any>(this.ServerAddTarea,tarea);
  }

}
