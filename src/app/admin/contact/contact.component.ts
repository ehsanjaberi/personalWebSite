import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IContact } from 'src/app/interface/app-interface';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/_alert/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent implements OnInit {
  contacts: IContact[];
  tableLoading: boolean = true;
  constructor(private acountService: AccountService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.acountService.getAllMessage().pipe(first()).subscribe({
      next: (res) => {
        this.tableLoading = false;
        this.contacts = res;
      },
      error: error => {
        this.tableLoading = false;
      }
    })
  }
  public deleteMsg(msg: IContact) {
    this.acountService.deleteMessage(+msg.id).pipe(first()).subscribe({
      next: (res) => {
        this.contacts = res;
        this.alertService.success('با موفقیت حذف شد.');
      },
      error: error => {
        this.alertService.error('عملیات با خطا مواجه شد');
      }
    })
  }
}
