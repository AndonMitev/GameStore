import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

//Service
import { GetDetailsGameService } from '../../../core/services/game-store-services/get-details-game.service';
//Model
import { DetailsGameModel } from '../../../core/models/view-models/details-game.model';
//State
import { AppState } from '../../../store/app.state';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';

@Component({
  selector: 'details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements OnInit, OnDestroy {
  public detailsGame: DetailsGameModel;
  public showSpinner: boolean;
  public userExists: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public verification: UserVerificationService,
    private gameService: GetDetailsGameService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute,
  ) {
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const GAME_ID: string = res['params']['id'];

        this.gameService
          .getGameDetails(GAME_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {

            this.store
              .pipe(
                select((state: AppState) => state.games.details),
                takeUntil(this.ngUnsubscribe)
              )
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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
