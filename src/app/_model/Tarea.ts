import { Estado } from "./Estado";
import { Prioridad } from "./Prioridad";

export class Tarea{

    id?: number;
    nombre?: string;
    detalle?: string;
    hora?: Date;
    prioridad?: Prioridad = new Prioridad();
    estado?: Estado = new Estado();
    
}