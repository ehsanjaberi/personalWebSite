import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ISkill } from 'src/app/interface/app-interface';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/_alert/alert.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.sass']
})
export class SkillComponent implements OnInit {
  skills: ISkill[];
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  isAddMode: boolean = true;
  tableLoading: boolean = true;
  currentSelectSkill: number;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.accountService.getAllskills().pipe(first()).subscribe({
      next: (res) =>{
        this.skills = res as ISkill[];
        this.tableLoading = false;
      },
    });
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      percent: ['', Validators.required]
    })
  }
  public get f() {
    return this.form.controls;
  }
  public onEditSkill(skill: ISkill) {
    this.currentSelectSkill = +skill.id;
    this.isAddMode = false;
    this.form.setValue({
      name: skill.name,
      percent: skill.percent,
    })
  }
  cancelEditSkill() {
    this.isAddMode = true;
    this.form.reset();
  }
  public onDeleteSkill(skill: ISkill) {
    this.loading = true;
    this.accountService.deleteSkill(skill.id).pipe(first()).subscribe({
      next: (res) => {
        this.skills = res as ISkill[];
        this.loading = false;
        this.alertService.success('مهارت شما حذف شد.')
      },
      error: error => {
        this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
      }
    })
  }
  public onSubmitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.isAddMode === true ? this.addSkill() : this.editSkill();
  }
  public addSkill() {
    this.accountService.addSkill(this.form.value).pipe(first()).subscribe({
      next: (res) => {
        this.loading = false;
        this.alertService.success('مهارت شما ذخیره شد.')
        this.form.reset();
        this.skills = res as ISkill[];
      },
      error: error => {
        this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
      }
    })
  }
  public editSkill() {
    console.log(this.currentSelectSkill);
    this.accountService.editSkill(this.currentSelectSkill,this.form.value).pipe(first()).subscribe({
      next: (res: ISkill[]) => {
        this.loading = false;
        this.skills = res;
        this.isAddMode = true;
        this.form.reset();
        this.alertService.success('مهارت شما با موفقیت ویرایش شد.')
      },
      error: error => {
        this.loading = false;
        this.alertService.error('خطا رخ داد،لطفا دوباره امتحان کنید.');
      }
    })
  }

}
