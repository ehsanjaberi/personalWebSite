import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../interface/app-interface";
import { AccountService } from "../services/account.service";

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit, OnDestroy{
  constructor(
    private router: Router,
    private accountService: AccountService,
    private spinner: NgxSpinnerService
    ) { }
  class: string;
  profileImgUrl: string = '';
  user$;
  ngOnInit(): void {
    this.spinner.hide();
    if (!this.accountService.UserValue) {
      this.router.navigate(['/adminpanel/login']);
    }
    // this.profileImgUrl = this.accountService.UserValue.img_url;
    this.user$ = this.accountService.UserValue$.subscribe((user)=>{
      this.profileImgUrl = user.img_url;
     });
  }
  public signOut() {
    this.user$.unsubscribe();
    this.accountService.logout();
  }
  public sidebarToggle() {
    this.class === "toggled" ? this.class = "" : this.class = "toggled";
  }
  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
