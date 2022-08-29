import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { SignalRService } from './service/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'signalr-test';

  message: string = "";
  messages: string[] = [];

  constructor(
    private signalR: SignalRService,
    private _http: HttpClient
  ){
    signalR.start("https://localhost:7146/message-hub");
  }
  ngOnInit(): void {
    this.signalR.on("messageMethod", message => {
      this.messages.push(message);      
    })
  }

  sendMessage(){
    this._http.get("https://localhost:7146/api/chats/SendMessage/" + this.message).subscribe(()=> {
      this.message = ""
    })
  }

  
}
