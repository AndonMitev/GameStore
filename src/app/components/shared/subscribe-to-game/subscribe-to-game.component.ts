import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Service
import { SubscriptionService } from '../../../core/services/game-store-services/subscribe-game.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'subscribe-to-game',
  templateUrl: './subscribe-to-game.component.html',
  styleUrls: ['./subscribe-to-game.component.css']
})
export class SubscribeToGameComponent implements OnDestroy {
  @Input('game')
  public game: any;
  private subscription: Subscription;

  constructor(
    private subscribeService: SubscriptionService,
    private toast: ToastrService,
    private store: Store<AppState>
  ) {}

  public subscribeToGame(): void {
    const GAME_ID: string = this.game['_id'];
    const USER_ID: string = localStorage.getItem('userId');
    this.game['subscriptions'].push(USER_ID);

    this.subscribeService.subscriptionGame(this.game, GAME_ID).subscribe(() => {
      this.subscription = this.store
        .select(state => state.games.details)
        .subscribe();
      this.toast.success('Successfully subscribed to game!');
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
