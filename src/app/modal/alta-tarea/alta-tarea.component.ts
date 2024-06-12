import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Tarea } from '../../_model/Tarea';


// @ts-ignore
const $: any = window['$'];

@Component({
  selector: 'app-alta-tarea',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './alta-tarea.component.html',
  styleUrl: './alta-tarea.component.css'
})
export class AltaTareaComponent {

  @ViewChild('modal') modal?: ElementRef;

  @Output() eventAlta = new EventEmitter();

  nombre:string = '';
  detalle:string ='';
  hora:Date =new Date(); 
  isT1Active: boolean = true;
  isT2Active: boolean = false;
  isT3Active: boolean = false;
  isComplete: boolean = false;
  tareaNew: any = new Object();
  prioridad: any = new Object();
  estado: any = new Object();
  
  constructor(
    private tareaService: TareaService
  ) { }

  openModal(){

    this.prioridad.id = 1;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal(){
    $(this.modal?.nativeElement).modal('toggle');
  }

  
  save(){

    this.tareaNew.id = null;
    this.tareaNew.hora = new Date();
    this.tareaNew.prioridad = this.prioridad;
    this.estado.id = this.isComplete == true ? 1 : 2 ;
    this.tareaNew.estado = this.estado;

    console.log('New Tarea -', this.tareaNew);

    this.tareaService.addTarea(this.tareaNew).subscribe(data=>{
      console.log(data);
    });
    
    alert('La tarea se agrego Exitosamente');
    this.eventAlta.emit();
    this.closeModal();
  }

  checkComplete(){
    this.isComplete = !this.isComplete;
    console.log('checkComplete - ', this.isComplete);
 }

 changePriori(event: any){
    console.log('changePriori - ', event);
    this.prioridad.id = event;
 }

 changeNombre(event:any){
    console.log('changeNombre - ', event.target.value);
    this.tareaNew.nombre = event.target.value;
 }

 changeDescri(event:any){
    console.log('changeDescri - ', event.target.value);
    this.tareaNew.detalle = event.target.value;
 }

}
