import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  imageUrl: string = 'assets/images/Apple-MacBook-Pro-1.png';
  // @TODO pusty konstruktor i ngOnInit - do usuniecia
  constructor() { }

  ngOnInit(): void {
  }
}
