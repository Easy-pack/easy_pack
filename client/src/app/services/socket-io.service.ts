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
    return this.http.post<any>(`http://localhost:8080/notification/post`, data)
  }

  acceptDelivrary(data){
    this.socket.emit('acceptDelivrary', data);
  }

  doneTransaction(data){
    data.role = "driver";
    return this.http.post<any>(`http://localhost:8080/notification/post`, data)
  }

  doneDelivrary(data){
    this.socket.emit('doneTransaction', data);
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
