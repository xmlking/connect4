import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { User } from '@xmlking/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.API_BASE_URL;
  private readonly entityPath = 'auth';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  createUser(entity: Partial<User>) {
    this.loadingSubject.next(true);
    return this.httpClient.post<User>(`${this.baseUrl}/${this.entityPath}`, entity).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  updateUser(id: number | string, entity: Partial<User>) {
    this.loadingSubject.next(true);
    return this.httpClient.put(`${this.baseUrl}/${this.entityPath}/${id}`, entity).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }


  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
