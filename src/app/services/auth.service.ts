import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface LoginResponse {
  token: string;
  userId: string;
  // other user info you get back
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor(private http: HttpClient) {}

  signUp(data: SignupPayload): Observable<any> {
    return this.http.post(environment.jsonApi + "/SignUp", data);
  } 
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.jsonApi + "/login", { email, password });
  }
}
