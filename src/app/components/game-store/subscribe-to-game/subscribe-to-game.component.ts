import { Component, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';

//Service
import { SubscriptionService } from '../../../core/services/game-store-services/subscribe-game.service';
//State
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'subscribe-to-game',
  templateUrl: './subscribe-to-game.component.html',
  styleUrls: ['./subscribe-to-game.component.css']
})
export class SubscribeToGameComponent implements OnDestroy {
  @Input('game')
  public game: any;
  public buttonText: string;
  public isClicked: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private subscribeService: SubscriptionService,
    private toast: ToastrService,
    private store: Store<AppState>
  ) {
    this.buttonText = 'Subscribe';
    this.isClicked = false;
  }

  public subscribeToGame(): void {
    this.buttonText = 'Processing...';
    this.isClicked = true;
    const USER_ID: string = localStorage.getItem('userId');
    const GAME_ID: string = this.game['_id'];
    this.game['subscriptions'].push(USER_ID);

    this.subscribeService
      .subscriptionGame(this.game, GAME_ID)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.store.pipe(
          select(state => state.games.details),
          takeUntil(this.ngUnsubscribe$)
        );
        this.buttonText = 'Subscribe';
        this.isClicked = false;
        this.toast.success('Successfully subscribed to game!');
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
