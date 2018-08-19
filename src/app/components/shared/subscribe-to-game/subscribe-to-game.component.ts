import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Service
import { EditGameService } from '../../../core/services/game-store-services/edit-game.service';

@Component({
  selector: 'subscribe-to-game',
  templateUrl: './subscribe-to-game.component.html',
  styleUrls: ['./subscribe-to-game.component.css']
})
export class SubscribeToGameComponent implements OnDestroy {
  @Input('game')
  game;
  private subscription: Subscription;

  constructor(
    private editGame: EditGameService,
    private toast: ToastrService
  ) {}

  subscribeToGame(): void {
    const GAME_ID: string = this.game['_id'];
    const USER_ID: string = localStorage.getItem('userId');

    this.game['subscriptions'].push(USER_ID);
    this.subscription = this.editGame
      .editGame(this.game, GAME_ID)
      .subscribe(() => {
        this.toast.success('Successfully subscribed to game!');
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
