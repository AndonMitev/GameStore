import { Component, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Service
import { DeleteGameService } from '../../../core/services/game-store-services/delete-game.service';

@Component({
  selector: 'delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnDestroy {
  @Input('gameId')
  public gameId: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private gameService: DeleteGameService,
    private router: Router
  ) {}

  public deleteGame(): void {
    this.gameService
      .deleteGame(this.gameId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate(['/game/all']);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
