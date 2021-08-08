import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IEducational } from 'src/app/interface/app-interface';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/_alert/alert.service';


@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  styleUrls: ['./educational.component.sass']
})
export class EducationalComponent implements OnInit {
  form: FormGroup;
  sumbitted: boolean = false;
  loading: boolean = false;
  tableLoading= true;
  currentSelectEduId: string;
  @ViewChild('closeBtn') closeBtn;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) { }
  isAddMode: boolean = true;
  Educationals: IEducational[];
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      year: ['',Validators.required],
      title: ['',Validators.required],
      text: ['',Validators.required],
      period: ['',Validators.required],
    })
    this.accountService.getAllEdu().pipe(first()).subscribe({
      next: (res: IEducational[]) => {
        this.Educationals = res;
        this.Educationals.sort((a,b)=>+a.id - +b.id);
        this.tableLoading = false;
      }
    })
  }
  public EditEducation(edu: IEducational) {
    this.isAddMode = false;
    this.form.reset();

    // this.form.setValue(edu);
    this.currentSelectEduId = edu.id;
    this.form.setValue({
      year: edu.year,
      title: edu.title,
      text: edu.text,
      period: edu.period
    })
  }
  public DeleteEducation(edu: IEducational) {
    this.accountService.deleteEdu(edu.id).pipe(first()).subscribe({
      next: (res: IEducational[])=> {
        this.alertService.success('سابقه شما با موفقیت حذف شد.');
        this.Educationals = res;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  public get f() {
    return this.form.controls;
  }
  public handleSubmit() {
    this.sumbitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.addEducational();
    }
    else{
      this.editEducational();
    }
  }
  public addEducational() {
    this.accountService.addEdu(this.form.value).pipe(first()).subscribe({
      next: ()=>{
        this.loading = false;
        this.Educationals.push(this.form.value);
        this.form.reset();
        this.alertService.success('سابقه شما با موفقیت ذخیره شد.');
        this.closeBtn.nativeElement.click();
      },
      error: error => {
        this.loading = false;
        this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
      }
    })
  }
  public editEducational() {
    return this.accountService.editEdu(this.currentSelectEduId,this.form.value).pipe(first()).subscribe({
      next: (res: IEducational) => {
        console.log(this.form.value);
        this.Educationals.forEach(edu => {
          if (edu.id === this.currentSelectEduId) {
            edu.year = this.f.year.value,
            edu.title = this.f.title.value,
            edu.text = this.f.text.value,
            edu.period = this.f.period.value
          }
        });
        this.loading = false;
        this.alertService.success('سابقه شما با موفقیت ویرایش شد.');
        this.closeBtn.nativeElement.click();
      },
      error: error => {
        this.loading = false;
        this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
      }
    })
  }


}
