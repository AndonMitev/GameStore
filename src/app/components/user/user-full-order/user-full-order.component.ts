import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'user-full-order',
  templateUrl: './user-full-order.component.html',
  styleUrls: ['./user-full-order.component.css']
})
export class UserFullOrderComponent implements OnInit {
  private fullOrder$;
  constructor(private store: Store<AppState>, private router : ActivatedRoute) {}

  ngOnInit() {
    this.fullOrder$ = this.store.pipe(select(state => state.orders.details))
  }
}
