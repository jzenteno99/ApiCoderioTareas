import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalleTareaComponent } from './modal/detalle-tarea/detalle-tarea.component';
import { AltaTareaComponent } from './modal/alta-tarea/alta-tarea.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    DetalleTareaComponent,
    AltaTareaComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Api Coderio Tareas';
}
