import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ConnectWebSocket,
  DisconnectWebSocket
} from '@ngx-starter-kit/socketio-plugin';
import { environment } from '@env/environment';
import { UserState } from '@xmlking/core';
import { CreateUser } from '@xmlking/core';

@Component({
  selector: 'ngx-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  user$ = this.store.select(UserState.getState);
  constructor(private store: Store) {}

  ngOnInit() {
    let userId = this.store.selectSnapshot(UserState.getId);
    if (userId) {
      this.store.dispatch(
        new ConnectWebSocket({
          url: environment.WS_EVENT_BUS_URL,
          tokenFn: () => userId
        })
      );
    } else {
      this.store.dispatch(new CreateUser({})).subscribe(
        () => {
          userId = this.store.selectSnapshot(UserState.getId);
          this.store.dispatch(
            new ConnectWebSocket({
              url: environment.WS_EVENT_BUS_URL,
              tokenFn: () => userId
            })
          );
        },
        (err) => console.log(err)
      );
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new DisconnectWebSocket());
  }
}
