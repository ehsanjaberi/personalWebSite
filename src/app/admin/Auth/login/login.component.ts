import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/_alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.spinner.hide();
    if (this.accountService.UserValue) {
      this.router.navigate(['/adminpanel/users']);
    }
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  get f() { return this.form.controls; }
  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe({
      next: (res) =>{
        this.router.navigate(['./users'],{relativeTo: this.activatedRoute.parent});
      },
      error: error =>{
        this.alertService.error('نام کاربری یا رمز عبور نادرست است.')
        this.loading = false;
      }
    })
  }
}
