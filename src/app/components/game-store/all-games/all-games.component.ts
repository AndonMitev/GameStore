import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

//Serivces
import { GetAllGamesService } from '../../../core/services/game-store-services/get-all-games.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllGamesModel } from '../../../core/models/view-models/all-games.model';

@Component({
  selector: 'all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {
  public allGames$: Observable<AllGamesModel[]>;
  public showSpinner: boolean;

  constructor(
    private gameService: GetAllGamesService,
    private store: Store<AppState>,
    private router: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void { 
    this.router.queryParamMap.subscribe(res => {
      const CATEGORY: string = res['params']['category'];
      this.gameService.getAllGames(CATEGORY).subscribe(() => {
        this.allGames$ = this.store.pipe(select(state => state.games.all));
        this.showSpinner = false;
      });
    });
  }
}
