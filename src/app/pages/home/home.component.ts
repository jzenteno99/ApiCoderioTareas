import { Component, EventEmitter, OnInit, Output, Type, ViewChild } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { DatePipe } from '@angular/common';
import { DetalleTareaComponent } from '../../modal/detalle-tarea/detalle-tarea.component';
import { AltaTareaComponent } from '../../modal/alta-tarea/alta-tarea.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, DetalleTareaComponent, AltaTareaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  @ViewChild(DetalleTareaComponent) modal?: DetalleTareaComponent;

  @ViewChild(AltaTareaComponent) modalAlta?: AltaTareaComponent;
  
  filterId?:string = "";
  tareas?: any[];
  tareasTotal?: any[];

  constructor(
    private tareaService: TareaService
  ){}

  ngOnInit(): void {
    this.getAllTareas();
  }

  editTarea(tarea:any){
    this.modal?.openModal(tarea);
  }

  deleteTarea(id:any){

    this.tareaService.deleteTarea(id).subscribe(data=>{
      //
    });
    alert('Registro borrado Exitosamente');
    this.getAllTareas();
  }

  onKeyAP(event:any){
   
    this.tareas = this.tareasTotal;
    var valueFilter = event.target.value;
    valueFilter = valueFilter.trim();
    
    if (valueFilter != '') {
      valueFilter = valueFilter.toUpperCase();
      this.tareas = this.tareas?.filter((t: any) => t.prioridad.nombre ==  valueFilter);
    } else {
        this.tareas = this.tareasTotal;
    }
  }

  getAllTareas(){   
    this.tareaService.getAllTareas().subscribe(data=>{
      this.tareas = data;
      this.tareasTotal = this.tareas;
      console.log('Tareas', this.tareas);
    });
  }

  addTarea(){
    this.modalAlta?.openModal();
  }
}
