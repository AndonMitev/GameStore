import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { CreateGameService } from '../../../core/services/game-store-services/create-game.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetDetailsGameService } from '../../../core/services/game-store-services/get-details-game.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { CreateGameInputModel } from '../../../core/models/input-models/create-game.model';
import { DetailsGameModel } from '../../../core/models/view-models/details-game.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { EditGameService } from '../../../core/services/game-store-services/edit-game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit, OnDestroy {
  public gameToEdit: CreateGameInputModel;
  public editGameForm: FormGroup;
  public platforms: string[] = [
    'PS4',
    'PS3',
    'PC',
    'Xbox360',
    'XboxOne',
    'UpComming'
  ];
  public modes: string[] = ['Single-player', 'Multiplayer'];
  private subscription: Subscription;
  private subscriptions: string[];
  private gameId : string;

  constructor(
    private gameService: GetDetailsGameService,
    private editGameService: EditGameService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      this.gameId = res['params']['id'];

      this.gameService.getGameDetails(this.gameId).subscribe(() =>
        this.store
          .pipe(select(state => state.games.details))
          .subscribe((gameToEdit: CreateGameInputModel) => {
            this.subscriptions = gameToEdit.subscriptions;
            this.gameToEdit = gameToEdit;
            this.initializeEditGameForm();
            this.setValues();
          })
      );
    });
  }

  public initializeEditGameForm(): void {
    this.editGameForm = this.fb.group({
      title: 
        [
          '', 
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      image:
        [
          '',
          Validators.required
        ],
      publisher: 
        [
          '', 
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      developer: 
        [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      series: 
        [
          '', 
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      selectedPlatform: 
        [
          '', 
          Validators.required
        ],
      release: 
        [
          '', 
          Validators.required
        ],
      genre: 
        [
          '', 
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      description:
        [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(500)]
        ],
      mode: 
        [
          '', 
          Validators.required
        ],
      price: 
        [
          0, 
          [Validators.required, Validators.min(5), Validators.pattern(/^\d+$/)]
        ]
    });
  }

  public setValues(): void {
    this.editGameForm.get('title').setValue(this.gameToEdit.title);
    this.editGameForm.get('image').setValue(this.gameToEdit.image);
    this.editGameForm.get('publisher').setValue(this.gameToEdit.publisher);
    this.editGameForm.get('developer').setValue(this.gameToEdit.developer);
    this.editGameForm.get('series').setValue(this.gameToEdit.series);
    this.editGameForm.get('selectedPlatform').setValue(this.gameToEdit.selectedPlatform);
    this.editGameForm.get('release').setValue(this.gameToEdit.release);
    this.editGameForm.get('genre').setValue(this.gameToEdit.genre);
    this.editGameForm.get('description').setValue(this.gameToEdit.description);
    this.editGameForm.get('mode').setValue(this.gameToEdit.mode);
    this.editGameForm.get('price').setValue(this.gameToEdit.price);
  }

  public submitEditGameForm(): void {
    const GAME_DATA = this.editGameForm.value;
    GAME_DATA['selectedPlatform'] = GAME_DATA['selectedPlatform'].toLowerCase();

    this.gameToEdit = new CreateGameInputModel(
      GAME_DATA['title'],
      GAME_DATA['image'],
      GAME_DATA['publisher'],
      GAME_DATA['developer'],
      GAME_DATA['series'],
      GAME_DATA['selectedPlatform'],
      GAME_DATA['release'],
      GAME_DATA['genre'],
      GAME_DATA['description'],
      GAME_DATA['mode'],
      Number(GAME_DATA['price']),
      this.subscriptions
    );

    this.editGameService.editGame(this.gameToEdit, this.gameId)
      .subscribe(() => {
        this.toast.success(`${GAME_DATA['title']} successfully edited!`);
        this.router.navigate([`/game/details/${this.gameId}`]);
      })
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public get title(): AbstractControl {
    return this.editGameForm.get('title');
  }

  public get image(): AbstractControl {
    return this.editGameForm.get('image');
  }

  public get publisher(): AbstractControl {
    return this.editGameForm.get('publisher');
  }

  public get developer(): AbstractControl {
    return this.editGameForm.get('developer');
  }

  public get series(): AbstractControl {
    return this.editGameForm.get('series');
  }

  public get selectedPlatform(): AbstractControl {
    return this.editGameForm.get('selectedPlatform');
  }

  public get release(): AbstractControl {
    return this.editGameForm.get('release');
  }

  public get genre(): AbstractControl {
    return this.editGameForm.get('genre');
  }

  public get description(): AbstractControl {
    return this.editGameForm.get('description');
  }

  public get mode(): AbstractControl {
    return this.editGameForm.get('mode');
  }

  public get price(): AbstractControl {
    return this.editGameForm.get('price');
  }
}
