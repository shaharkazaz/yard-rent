import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit {
  socket;
  numberOfOnlineUsers: number;

  constructor() {
    this.socket = io('http://127.0.0.1:3000');
  }

  ngOnInit() {
    this.socket.on('numClients', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers.numClients;
    });
  }

}
