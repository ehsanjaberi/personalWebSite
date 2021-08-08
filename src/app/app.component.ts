import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Typed from 'typed.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],

})
export class AppComponent implements OnInit {
  constructor(private spinnerService: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinnerService.show();
  }



}
