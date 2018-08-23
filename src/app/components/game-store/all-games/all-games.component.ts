import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
  public selectedCriteria: string;
  public sortBy: string[] = [
    'Asc Alpha',
    'Asc Price',
    'Desc Alpha',
    'Desc Price',
    'Default'
  ];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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

    this.router.queryParamMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const CATEGORY: string = res['params']['category'];

        this.gameService
          .getAllGames(CATEGORY)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.allGames$ = this.store.pipe(
              select((state: AppState) => state.games.all)
            );
            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public initializeSearchForm(): void {
    this.searchForm = this.fb.group({
      name: '',
      sortedCriteria: ''
    });
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }

  public selectedSortedCriteria(criteria): void {
    switch (criteria) {
      case 'Asc Alpha':
        this.selectedCriteria = 'title';
        break;
      case 'Asc Price':
        this.selectedCriteria = 'price';
        break;
      case 'Desc Alpha':
        this.selectedCriteria = '-title';
        break;
      case 'Desc Price':
        this.selectedCriteria = '-price';
        break;
      default:
        this.selectedCriteria = '';
        break;
    }
  }
}
