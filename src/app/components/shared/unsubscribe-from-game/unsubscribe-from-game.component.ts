import { Component, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

//Service
import { SubscriptionService } from '../../../core/services/game-store-services/subscribe-game.service';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'unsubscribe-from-game',
  templateUrl: './unsubscribe-from-game.component.html',
  styleUrls: ['./unsubscribe-from-game.component.css']
})
export class UnsubscribeFromGameComponent implements OnDestroy {
  @Input('game')
  public game: any;

  private subscription: Subscription;

  constructor(
    private unsubscribeService: SubscriptionService,
    private toast: ToastrService,
    private store: Store<AppState>
  ) {}

  public unsubscribeUser() {
    const GAME_ID = this.game['_id'];
    const USER_ID = localStorage.getItem('userId');

    this.game['subscriptions'] = this.game['subscriptions'].filter(
      id => id !== USER_ID
    );
    
    this.unsubscribeService
      .subscriptionGame(this.game, GAME_ID)
      .subscribe(() => {
        this.subscription = this.store
          .select((state: AppState) => state.games.details)
          .subscribe();
        this.toast.success('Successfully unsubscribed from game!');
      });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
