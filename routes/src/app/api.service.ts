import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';

const API_URL = environment.apiUrl;

// @Injectable()
// export class ApiService {

//   constructor() { }

// }

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

}