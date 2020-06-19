import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;

  constructor(private http : HttpClient,
              private authService : AuthService) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT); 
    return this.socket;
  }

  getSocket(){
    return this.socket;
  }

  emmitTransaction(data){
    this.socket.emit('newTransaction', data);
    return this.http.post<any>(`http://localhost:8080/notification/post`, data)
  }

  acceptTransaction(data){
    data.driverId = localStorage.getItem('id');
    data.role = "driver";
    this.socket.emit('acceptDelivrary', data);
    return this.http.post<any>(`http://localhost:8080/notification/post`, data)
  }

  doneTransaction(data){
    data.role = "driver";
    this.socket.emit('doneTransaction', data);
    return this.http.post<any>(`http://localhost:8080/notification/post`, data)
  }

  getNotification(){
    let data = {
      id : this.authService.getId(),
      role : this.authService.getRole()
    }
    console.log('data ', data);
    return this.http.post<any>(`http://localhost:8080/notification/get`, data)
  }

  updateNotification(notification){
    return this.http.post<any>(`http://localhost:8080/notification/update`, notification)
  }
}
