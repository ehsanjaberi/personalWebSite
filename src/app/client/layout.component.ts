import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { first } from "rxjs/operators";
import Typed from 'typed.js'
import { IEducational, ISkill, User } from "../interface/app-interface";
import { AccountService } from "../services/account.service";
import { ClientService } from "../services/client.service";
import { AlertService } from "../_alert/alert.service";

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],

})
export class LayoutComponent implements OnInit {
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private accountService: AccountService,
    private FormBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public alertService: AlertService,

  ) { }
  user: User = null;
  loading: boolean = false;
  submitted: boolean = false;
  skills: ISkill[];
  educational;
  ngOnInit(): void {
    var options = {
      strings: ['توسعه دهنده وب', 'angularDeveloper'],
      typeSpeed: 150,
      loop: true
    }
    var typed = new Typed('.herotype', options);
    this.route.data.subscribe(data => {
      this.user = data.clientInf;
      this.spinner.hide();
    });
    this.form = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required],
    })
    this.accountService.getAllskills().pipe(first()).subscribe({
      next: res => {
        this.skills = res as ISkill[];
      }
    });
    this.accountService.getAllEdu().pipe(first()).subscribe({
      next: (res: IEducational[]) => {
        this.educational = res.reduce((r,{year})=>{
          if(!r.some(o=>o.year==year)){
            r.push({year,groupItem:res.filter(v=>v.year==year)});
      }
      return r;
      },[]);
      }
    });
  }
  class: string;
  title = 'PersonalWebSite';
  public sidebarToggle() {
    this.class === "toggled" ? this.class = "" : this.class = "toggled";
  }
  public get f() {
    return this.form.controls;
  }
  public onSubmitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.clientService.AddContact(this.form.value).pipe(first()).subscribe({
      next: (res) => {
        this.loading = false;
        this.alertService.success('پیام شما با موفقیت ارسال شد.');
      },
      error: error => {
        this.alertService.error('عملیات با خطا مواجه شد.');
        this.loading = false;
      }

    })
  }
}
