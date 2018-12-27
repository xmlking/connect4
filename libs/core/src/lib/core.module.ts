import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsWebsocketPluginModule } from '@ngx-starter-kit/socketio-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { environment } from '@env/environment';
import { UserState } from './store/user/user.state';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: ['user'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production, // Set to true for prod mode
      maxAge: 10,
    }),
    NgxsWebsocketPluginModule.forRoot({
      url: environment.WS_EVENT_BUS_URL,
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
