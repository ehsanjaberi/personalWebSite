import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IContact, IEducational, ISkill, User } from '../interface/app-interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private httpclient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get UserValue(): User {
    return this.userSubject.value;
  }
  public get UserValue$() {
    return this.userSubject;
  }
  public login(username, password) {
    return this.httpclient.post<User>(`${environment.apiurl}/login`,{username, password})
    .pipe(map(user => {
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    )
  }
  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/adminpanel/login'])
  }
  public updatePass(id, params) {
    return this.httpclient.put(`${environment.apiurl}/user/changePassword/${id}`,params)
      .pipe(map(x => {
          // const user = { ...this.UserValue, ...params };
          localStorage.setItem('user',JSON.stringify(x));
          this.userSubject.next(x as User);
        return x;
      }));
  }
  public update(id,params) {
    return this.httpclient.put(`${environment.apiurl}/user/update/${id}`,params)
          .pipe(map(x => {
            const user = { ...this.UserValue, ...params };
            localStorage.setItem('user',JSON.stringify(user));
            this.userSubject.next(user);
            return x;
          }))
  }
  public updatePic(id, params){
    return this.httpclient.post(`${environment.apiurl}/user/updatePic/${id}`,params).pipe(
      map(user => {
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user as User);
        return user;
      })
    )
  }
  public getInf() {

  }
  // Educational
  public getAllEdu() {
    return this.httpclient.get(`${environment.apiurl}/Educational/getAll`);
  }
  public addEdu(edu: IEducational) {
    return this.httpclient.post<IEducational>(`${environment.apiurl}/Educational/Add`,edu);
  }
  public editEdu(id,params) {
    return this.httpclient.put(`${environment.apiurl}/Educational/Edit/${id}`,params);
  }
  public deleteEdu(id) {
    return this.httpclient.delete(`${environment.apiurl}/Educational/Delete/${id}`);
  }
  // Skill
  public getAllskills() {
    return this.httpclient.get(`${environment.apiurl}/Skills/getAll`);
  }
  public addSkill(skill: ISkill) {
    return this.httpclient.post<ISkill[]>(`${environment.apiurl}/Skills/Add`,skill);
  }
  public editSkill(id, params) {
    return this.httpclient.put(`${environment.apiurl}/Skills/Edit/${id}`,params);
  }
  public deleteSkill(id) {
    return this.httpclient.delete(`${environment.apiurl}/Skills/Delete/${id}`);
  }
  //Contact
  public getAllMessage() {
    return this.httpclient.get<IContact[]>(`${environment.apiurl}/Contact/getAll`);
  }
  public deleteMessage(id: number) {
    return this.httpclient.delete<IContact[]>(`${environment.apiurl}/Contact/Delete/${id}`);
  }
}
