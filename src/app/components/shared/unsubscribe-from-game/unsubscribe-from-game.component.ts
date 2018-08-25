import { Component, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

//Service
import { SubscriptionService } from '../../../core/services/game-store-services/subscribe-game.service';
import { AppState } from '../../../store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'unsubscribe-from-game',
  templateUrl: './unsubscribe-from-game.component.html',
  styleUrls: ['./unsubscribe-from-game.component.css']
})
export class UnsubscribeFromGameComponent implements OnDestroy {
  @Input('game')
  public game: any;
  public buttonText: string;
  public isClicked: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private unsubscribeService: SubscriptionService,
    private toast: ToastrService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.buttonText = 'Unsubscribe';
    this.isClicked = false;
  }

  public unsubscribeUser(): void {
    this.buttonText = 'Processing...';
    this.isClicked = true;
    const USER_ID: string = localStorage.getItem('userId');
    const GAME_ID: string = this.game['_id'];
    this.game['subscriptions'] = this.game['subscriptions'].filter(
      id => id !== USER_ID
    );

    this.unsubscribeService
      .subscriptionGame(this.game, GAME_ID)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.store
          .pipe(
            select((state: AppState) => state.games.details),
            takeUntil(this.ngUnsubscribe$)
          )
          .subscribe();
        this.buttonText = 'Unsubscribe';
        this.isClicked = false;
        this.toast.success('Successfully unsubscribed from game!');
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
