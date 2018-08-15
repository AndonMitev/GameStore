import { Component, Input } from '@angular/core';
import { SubscribeToGameService } from '../../../core/services/subscription.services.ts/subscribe-to-game.service';
import { ToastrService } from 'ngx-toastr';
import { SubscribeToGameModel } from '../../../core/models/view-models/subscribe-to-game.model';

@Component({
  selector: 'subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.css']
})
export class SubscribeButtonComponent {
  @Input('detailsGame')
  detailsGame;

  private subscribeModel: SubscribeToGameModel;

  constructor(
    private subscribeUserService: SubscribeToGameService,
    private toast: ToastrService
  ) {}

  subscribeToGame() {
    const USER = localStorage.getItem('userId');
    this.subscribeModel = new SubscribeToGameModel(
      USER,
      this.detailsGame['title'],
      this.detailsGame['image']
    );
    this.subscribeUserService
      .subscribeUser(this.subscribeModel)
      .subscribe(() =>
        this.toast.success(
          `Successfully subscribe to ${this.detailsGame['title']}`
        )
      );
  }
}
