import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  ConnectWebSocket,
  DisconnectWebSocket, SendWebSocketAction,
  WebSocketConnected,
  WebSocketDisconnected
} from '@ngx-starter-kit/socketio-plugin';
import { AddPiece, PieceAdded } from './game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameHandler {
  constructor(private actions$: Actions, private store: Store) {
    this.actions$
      .pipe(ofActionSuccessful(ConnectWebSocket))
      .subscribe(action => console.log('ConnectWebSocket', action));
    this.actions$
      .pipe(ofActionSuccessful(DisconnectWebSocket))
      .subscribe(action => console.log('DisconnectWebSocket', action));

    this.actions$
      .pipe(ofActionSuccessful(WebSocketConnected))
      .subscribe(action => {
        console.log('WebSocketConnected', action);
      });
    this.actions$
      .pipe(ofActionSuccessful(WebSocketDisconnected))
      .subscribe(action =>
        console.log('WebSocketDisconnected', action)
      );
    // this.actions$
    //   .pipe(ofActionSuccessful(AddPiece))
    //   .subscribe(action => this.store.dispatch(new SendWebSocketAction(new PieceAdded(action))));
  }
}
