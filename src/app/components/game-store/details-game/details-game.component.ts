import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

//Service
import { GetDetailsGameService } from '../../../core/services/game-store-services/get-details-game.service';
//Model
import { DetailsGameModel } from '../../../core/models/view-models/details-game.model';
//State
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements OnInit, OnDestroy {
  public detailsGame: DetailsGameModel;
  public showSpinner: boolean;
  public userExists: boolean;
  private subscription: Subscription;

  constructor(
    private gameService: GetDetailsGameService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const GAME_ID: string = res['params']['id'];

      this.gameService.getGameDetails(GAME_ID).subscribe(() => {
        this.subscription = this.store
          .pipe(select((state: AppState) => state.games.details))
          .subscribe((res: DetailsGameModel) => {
            const SUBSCRIPTIONS: string[] = res['subscriptions'];
            const USER_ID: string = localStorage.getItem('userId');

            if (
              SUBSCRIPTIONS.length !== 0 &&
              SUBSCRIPTIONS.indexOf(USER_ID) !== -1
            ) {
              this.userExists = true;
            } else {
              this.userExists = false;
            }
            this.detailsGame = res;
            this.showSpinner = false;
          });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
