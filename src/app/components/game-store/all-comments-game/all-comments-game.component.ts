import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

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
export class AllCommentsGameComponent implements OnInit {
  private allComments$: Observable<AllCommentsGameModel[]>;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>,
    private getCommentsService: GetAllCommentsService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(res => {
      const GAME_ID: string = res['params']['id'];
      this.getCommentsService.getAllComments(GAME_ID).subscribe(() => {
        this.allComments$ = this.store.pipe(
          select(state => state.comments.all)
        );
      });
    });
  }
}
