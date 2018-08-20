import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

//Service
import { GetAllCommentsService } from '../../../core/services/comment-services/get-all-comments-game.service';
//Model
import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';
//State
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'all-comments-game',
  templateUrl: './all-comments-game.component.html',
  styleUrls: ['./all-comments-game.component.css']
})
export class AllCommentsGameComponent implements OnInit, OnDestroy {
  public allComments$: Observable<AllCommentsGameModel[]>;
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  private subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>,
    private getCommentsService: GetAllCommentsService
  ) {
    this.currPage = 1;
    this.pageSize = 6;
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription = this.router.paramMap.subscribe((res: ParamMap) => {
      const GAME_ID: string = res['params']['id'];
      this.getCommentsService.getAllComments(GAME_ID).subscribe(() => {
        this.allComments$ = this.store.pipe(
          select((state: AppState) => state.comments.all)
        );
        this.showSpinner = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
