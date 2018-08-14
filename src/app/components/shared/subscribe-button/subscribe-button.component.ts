import { Component, OnInit, Input } from '@angular/core';
import { SubscribeToGameService } from '../../../core/services/subscription.services.ts/subscribe-to-game.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { SubscribeToGameModel } from '../../../core/models/view-models/subscribe-to-game.model';

@Component({
  selector: 'subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.css']
})
export class SubscribeButtonComponent implements OnInit {
  @Input('detailsGame')
  detailsGame;
  
  private subscribeModel: SubscribeToGameModel;

  constructor(
    private subscribeUserService: SubscribeToGameService,
    private toast: ToastrService
  ) {
  
  }

  ngOnInit() {
    console.log(this.detailsGame)
  }

  subscribeToGame() {
    /*this.subscribeModel = new SubscribeToGameModel()
    const USER = localStorage.getItem('userId');
    this.subscribeModel = new SubscribeToGameModel(USER, gameTitle, gameImage);
    this.subscribeUserService
      .subscribeUser(this.subscribeModel)
      .subscribe(() =>
        this.toast.success(`Successfully subscribe to ${gameTitle}`)
      ); */
  }  
}
