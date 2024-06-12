import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TareaService } from '../../services/tarea.service';

// @ts-ignore
const $: any = window['$'];

@Component({
  selector: 'app-detalle-tarea',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './detalle-tarea.component.html',
  styleUrl: './detalle-tarea.component.css'
})
export class DetalleTareaComponent {

  @ViewChild('modal') modal?: ElementRef;

  
  @Output() eventData = new EventEmitter();

  data?: any = new Object();
  isT1Active: boolean = false;
  isT2Active: boolean = false;
  isT3Active: boolean = false;
  isComplete: boolean = false;
  
  constructor(
    private tareaService: TareaService
  ) { }

  openModal(tarea: any){

    this.data = tarea;
    this.setData(tarea);
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal(){
    $(this.modal?.nativeElement).modal('toggle');
  }


  save(){
    this.data.hora = new Date();
    console.log('DATA -',this.data);
    this.tareaService.updateTarea(this.data).subscribe(data=>{
      this.data = data;
    });
    alert('Registro Editado Exitosamente');
    this.eventData.emit();
    this.closeModal();
  }

  setData(tarea:any){

    switch(tarea.prioridad.id){
      case 1 :{this.isT1Active = true; this.isT2Active =false; this.isT3Active =false; break;}
      case 2 :{this.isT1Active = false; this.isT2Active =true; this.isT3Active =false; break;}
      case 3 :{this.isT1Active = false; this.isT2Active =false; this.isT3Active =true; break;}
    }

    if (tarea.estado.id == 1) {
      this.isComplete = true;
    } else {
      this.isComplete = false;
    }
  }

  checkComplete(){
    
    this.isComplete = !this.isComplete;
    console.log('checkComplete - ', this.isComplete);
    this.data.estado.id = this.isComplete == true ? 1 : 2 ;
 }

 changePriori(event: any){
  console.log('changePriori - ', event);
  this.data.prioridad.id = event;
 }

 changeNombre(event:any){
  console.log('changeNombre - ', event.target.value);
  this.data.nombre = event.target.value;
 }

 changeDescri(event:any){
  console.log('changeDescri - ', event.target.value);
  this.data.detalle = event.target.value;
 }
}
