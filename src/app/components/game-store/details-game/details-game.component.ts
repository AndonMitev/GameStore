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

@Component({
  selector: 'details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements OnInit, OnDestroy {
  public detailsGame$: Observable<DetailsGameModel>;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private gameService: GetDetailsGameService,
    private store: Store<AppState>,
    private router: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription = this.router.paramMap.subscribe((res: ParamMap) => {
      const GAME_ID: string = res['params']['id'];

      this.gameService.getGameById(GAME_ID).subscribe(() => {
        this.detailsGame$ = this.store.pipe(
          select((state: AppState) => state.games.details)
        );
        this.showSpinner = false;
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
