import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { log } from 'console';
import { Tutorial } from 'src/app/models/tutorial';
import { API_URL } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TutorialHttpRequestsService {

  constructor(private readonly http: HttpClient) { }

  getAllTutorials(): Observable<Tutorial[]>{
    return this.http.get<Tutorial[]>(`${API_URL}/tutorials`);
  }

  getTutorialById(id: number): Observable<Tutorial>{
    return this.http.get<Tutorial>(`${API_URL}/tutorials/${id}`);
  }

  
  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/tutorials`, data);
  }
  
  update(id:number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id:number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${API_URL}/tutorials`);
  }

  findByTitle(title: string): Observable<any> {
    return this.http.get(`${API_URL}?title=${title}`);
  }

}
