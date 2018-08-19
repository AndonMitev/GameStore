import { Component, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

//Service
import { EditGameService } from '../../../core/services/game-store-services/edit-game.service';

@Component({
  selector: 'unsubscribe-from-game',
  templateUrl: './unsubscribe-from-game.component.html',
  styleUrls: ['./unsubscribe-from-game.component.css']
})
export class UnsubscribeFromGameComponent implements OnDestroy {
  @Input('game')
  game;
  private subscription: Subscription;

  constructor(private edit: EditGameService, private toast: ToastrService) {}

  unsubscribeUser() {
    const GAME_ID = this.game['_id'];
    const USER_ID = localStorage.getItem('userId');

    this.game['subscriptions'] = this.game['subscriptions'].filter(
      id => id !== USER_ID
    );
    this.subscription = this.edit.editGame(this.game, GAME_ID).subscribe(() => {
      this.toast.success('Successfully unsubscribed from game!');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
