import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";
import { AlertService } from "src/app/_alert/alert.service";
@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit{
  form: FormGroup;
  filename: string = '';
  filePath: string;
  formData = new FormData();
  constructor(
    private accountService: AccountService,
    private formBiulder: FormBuilder,
    private alertService: AlertService
    ) {}
  loading: boolean = false;
  loadingPic: boolean = false;
  sumbitted: boolean = false;
  ngOnInit(): void {
    this.form = this.formBiulder.group({
      description: [this.accountService.UserValue.description],
      birthday: [this.accountService.UserValue.birthday],
      age: [this.accountService.UserValue.age],
      city: [this.accountService.UserValue.city],
      website: [this.accountService.UserValue.website],
      eg: [this.accountService.UserValue.degree],
      phonenumber: [this.accountService.UserValue.phonenumber],
      email: [this.accountService.UserValue.email],
    })
  }
  public onSubmit(){
    this.sumbitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const id = this.accountService.UserValue.id;
    this.accountService.update(id, this.form.value).pipe(first())
    .subscribe({
      next: (res) => {
        // this.form.reset();
        this.alertService.success('با موفقیت ویرایش شد.');
        this.loading = false;
      },
      error: error => {
        this.alertService.error('خطا رخ داد.لطفا دوباره امتحان کنید.');
        this.loading = false;
      }
    })
  }

  public onFileSelected(event) {
    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      // const formData = new FormData();
      this.formData.append("img", file);
      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  public uploadFile() {
    if (!this.formData.has('img')) {
      return;
    }
    this.loadingPic = true;
    const id = this.accountService.UserValue.id;
    this.accountService.updatePic(id,this.formData).pipe(first()).subscribe({
      next: (res) => {
        this.loadingPic = false;
        this.alertService.success('با موفقیت ویرایش شد.');
      },
      error: error => {
        this.alertService.error('خطا رخ داد.لطفا دوباره امتحان کنید.');
        this.loadingPic = false;
      }
    })
  }
}
