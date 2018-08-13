import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Service
import { GetAllCommentsService } from '../../../core/services/comment-services/get-all-comments-game.service';
//Model
import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';
//State
import { AppState } from '../../../store/app.state';
import { DeleteCommentService } from '../../../core/services/comment-services/delete-comment.service';

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
    private getCommentsService: GetAllCommentsService,
    private deleteCommentService: DeleteCommentService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(res => {
      const GAME_ID: string = res['params']['id'];
      this.getCommentsService.getAllComments(GAME_ID).subscribe(() => {
        this.allComments$ = this.store.select(state => state.comments.all);
      });
    });
  }
}
