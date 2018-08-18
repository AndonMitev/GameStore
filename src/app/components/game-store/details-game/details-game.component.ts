import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

//Service
import { GetDetailsGameService } from '../../../core/services/game-store-services/get-details-game.service';
//Model
import { DetailsGameModel } from '../../../core/models/view-models/details-game.model';
//State
import { AppState } from '../../../store/app.state';
import { map } from '../../../../../node_modules/rxjs/operators';

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
    private router: ActivatedRoute
  ) {
    this.showSpinner = true;
    this.userExists = false;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((res: ParamMap) => {
      const GAME_ID: string = res['params']['id'];
      this.gameService.getGameById(GAME_ID).subscribe(() => {
        this.subscription = this.store
          .pipe(select(state => state.games.details))
          .subscribe(res => {
            const SUBSCRIPTIONS = res['subscriptions'];
            const USER_ID = localStorage.getItem('userId');
            if (
              SUBSCRIPTIONS.length !== 0 &&
              SUBSCRIPTIONS.indexOf(USER_ID) !== -1
            ) {
              this.userExists = true;
            }
            this.detailsGame = res;
            this.showSpinner = false;
          });
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showOrHideSubscribeButton() {}
}
