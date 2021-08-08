import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input() class: string;
  @Input() imgUrl: string;
  constructor() { }

  ngOnInit(): void {
  }

}
