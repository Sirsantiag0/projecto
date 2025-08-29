import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  viewDate: Date = new Date();
  events = [
    {
      start: new Date(),
      title: 'Evento de prueba',
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // inicialización
  }
}
