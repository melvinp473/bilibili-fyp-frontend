import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://your-backend-api-url/predict'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getPrediction(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
