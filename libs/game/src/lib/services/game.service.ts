import { Injectable } from '@angular/core';
import { GameServiceModule } from './game-service.module';
import { environment } from '@env/environment';
import { Match } from '@xmlking/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: GameServiceModule,
})
export class GameService {
  baseUrl = environment.API_BASE_URL;
  readonly entityPath = 'game/match';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getById(id: number | string): Observable<Match> {
    this.loadingSubject.next(true);
    return this.httpClient.get<Match>(`${this.baseUrl}/${this.entityPath}/${id}`).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getOpenMatches(): Observable<Match[]> {
    this.loadingSubject.next(true);
    return this.httpClient.get<[Match[], number]>(`${this.baseUrl}/${this.entityPath}/opened`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => setTimeout(() => this.loadingSubject.next(false), 1000) ),
      // return without count
      map(data => data[0]),
    );
  }

  getAll(): Observable<[Match[], number]> {
    this.loadingSubject.next(true);
    return this.httpClient.get<[Match[], number]>(`${this.baseUrl}/${this.entityPath}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  delete(id: number | string) {
    this.loadingSubject.next(true);
    return this.httpClient.delete(`${this.baseUrl}/${this.entityPath}/${id}`).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  create(entity: Partial<Match>): Observable<Match> {
    this.loadingSubject.next(true);
    return this.httpClient.post<Match>(`${this.baseUrl}/${this.entityPath}`, entity).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  join(matchId: string): Observable<Match> {
    this.loadingSubject.next(true);
    return this.httpClient.put<Match>(`${this.baseUrl}/${this.entityPath}/${matchId}`, {}).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
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
