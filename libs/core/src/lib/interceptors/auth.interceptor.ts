import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { environment } from '@env/environment';
import { UserState } from '../store/user/user.state';

const allowedUrls = [environment.API_BASE_URL];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(UserState.getId);
    if (!token) console.log('no token found in the UserState');
    const url = req.url.toLowerCase();
    const found = !!allowedUrls.find(u => url.startsWith(u));
    if (!found) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req);
  }
}
