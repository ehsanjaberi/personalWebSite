import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IContact } from '../interface/app-interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements Resolve<Observable<Object>> {

  constructor(private http$: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Object> | Observable<Observable<Object>> | Promise<Observable<Object>> {
    return this.http$.get(`${environment.apiurl}/GetInformation`);
  }

  public AddContact(contant: IContact) {
    return this.http$.post<boolean>(`${environment.apiurl}/Contact/Add`,contant);
  }
}
