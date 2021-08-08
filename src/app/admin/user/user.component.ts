import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";
import { AlertService } from "src/app/_alert/alert.service";

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit{
  form: FormGroup;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) {}
  submitted: boolean = false;
  loading: boolean = false;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }
  public get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (!this.f.username.value && !this.f.password.value) {
      this.alertService.info('*در صورت عدم تمایل به تغیر نام کاربری یا رمز عبور فیلد مربوطه را خالی بگذارید.');
      return;
    }
    if (this.form.invalid) {
      // return;
    }
    this.loading = true;
    const id = this.accountService.UserValue.id;
    this.accountService.updatePass(id, this.form.value).pipe(first())
        .subscribe({
          next: (q) =>{
            this.loading = false;
            this.submitted = false;
            this.form.reset();
            this.alertService.success('اطلاعات شما با موفقیت ویرایش شد.');
          },
          error: error => {
            this.loading = false;
            this.submitted = false;
            this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
          }
        })
  }

}
