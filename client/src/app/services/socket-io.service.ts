import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;

  constructor() { }

  setupSocketConnection() {
    return this.socket = io(environment.SOCKET_ENDPOINT);
  }

  emmitTransaction(data){
    this.socket.emit('newTransaction', data);
  }
}
