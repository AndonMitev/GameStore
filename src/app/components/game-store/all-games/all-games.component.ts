import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

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
export class AllGamesComponent implements OnInit, OnDestroy {
  public currPage: number;
  public pageSize: number;
  public allGames$: Observable<AllGamesModel[]>;
  public showSpinner: boolean;
  public searchForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private gameService: GetAllGamesService,
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.currPage = 1;
    this.pageSize = 9;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.initializeSearchForm();
    this.subscription = this.router.queryParamMap.subscribe((res: ParamMap) => {
      const CATEGORY: string = res['params']['category'];

      this.gameService.getAllGames(CATEGORY).subscribe(() => {
        this.allGames$ = this.store.pipe(
          select((state: AppState) => state.games.all)
        );
        this.showSpinner = false;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public initializeSearchForm() {
    this.searchForm = this.fb.group({
      name: ''
    });
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
