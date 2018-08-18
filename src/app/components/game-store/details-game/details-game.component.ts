import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

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
export class DetailsGameComponent implements OnInit {
  public detailsGame$: Observable<DetailsGameModel>;
  public showSpinner: boolean;

  constructor(
    private gameService: GetDetailsGameService,
    private store: Store<AppState>,
    private router: ActivatedRoute //private subscribeService: GetUserSubscriptionsService
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(res => {
      const GAME_ID = res['params']['id'];
      this.gameService.getGameById(GAME_ID).subscribe(() => {
        this.detailsGame$ = this.store.pipe(
          select(state => state.games.details)
        );
        this.showSpinner = false;
      });
    });
  }

  showOrHideSubscribeButton() {}
}
