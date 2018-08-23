import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

//Service
import { EditGameService } from '../../../core/services/game-store-services/edit-game.service';
import { GetDetailsGameService } from '../../../core/services/game-store-services/get-details-game.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateGameInputModel } from '../../../core/models/input-models/create-game.model';

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
  private ngUnsubscribe: Subject<void> = new Subject<void>();
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
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        this.gameId = res['params']['id'];

        this.gameService
          .getGameDetails(this.gameId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() =>
            this.store
              .pipe(
                select(state => state.games.details),
                takeUntil(this.ngUnsubscribe)
              )
              .subscribe((gameToEdit: CreateGameInputModel) => {
                this.subscriptions = gameToEdit.subscriptions;
                this.gameToEdit = gameToEdit;
                this.initializeEditGameForm();
                this.setValues();
              })
          );
      });
  }

  
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    this.title.setValue(this.gameToEdit.title);
    this.image.setValue(this.gameToEdit.image);
    this.publisher.setValue(this.gameToEdit.publisher);
    this.developer.setValue(this.gameToEdit.developer);
    this.series.setValue(this.gameToEdit.series);
    this.selectedPlatform.setValue(this.gameToEdit.selectedPlatform);
    this.release.setValue(this.gameToEdit.release);
    this.genre.setValue(this.gameToEdit.genre);
    this.description.setValue(this.gameToEdit.description);
    this.mode.setValue(this.gameToEdit.mode);
    this.price.setValue(this.gameToEdit.price);
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

    this.editGameService
      .editGame(this.gameToEdit, this.gameId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.toast.success(`${GAME_DATA['title']} successfully edited!`);
        this.router.navigate([`/game/details/${this.gameId}`]);
      })
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
