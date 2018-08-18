import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'subscribe-to-game',
  templateUrl: './subscribe-to-game.component.html',
  styleUrls: ['./subscribe-to-game.component.css']
})
export class SubscribeToGameComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  subscribeToGame() {
    console.log('subscribe');
  }
}
