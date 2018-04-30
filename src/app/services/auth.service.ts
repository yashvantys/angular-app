import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClient ,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let apiUrl = "http://localhost/satsyil/api/";

@Injectable()
export class AuthService {
  	private publicDealsUrl = 'http://local.lumenapi.com/login';
  	constructor(private http: HttpClient) {
    
   }

   auth: boolean = false;
 
	login(u: string, p: string): Observable<boolean> {
		return this.http.post(this.publicDealsUrl, JSON.stringify({"email": u, "password":p}),{headers:new HttpHeaders})
			.map(response => {
				//console.log(response);
				if(response['success'] == 1) {
					this.auth = true;
					sessionStorage.setItem('user_id', response['result'].id);
					sessionStorage.setItem('email', response['result'].email);
					sessionStorage.setItem('username', response['result'].username);
					sessionStorage.setItem('auth', 'true');
					sessionStorage.setItem('api_token', response['api_token']);					
					return true;
				} else {
					return false;
				}
			}).catch(() => {
				//console.log("Could not login");
				return Observable.of(false);
			});
	}

	/**
   * Logs out the current user
   */
  logout() {
	//return this.auth.logout();
	sessionStorage.clear();
    sessionStorage.removeItem('auth');
  }

  isAuthenticated(): boolean {return this.auth};

}
