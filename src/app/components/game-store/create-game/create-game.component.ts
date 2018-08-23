import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

//Model
import { CreateGameInputModel } from '../../../core/models/input-models/create-game.model';
//Service
import { CreateGameService } from '../../../core/services/game-store-services/create-game.service';


@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  public gameForm: FormGroup;
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
  private createGameData: CreateGameInputModel;

  constructor(
    private fb: FormBuilder,
    private gameService: CreateGameService,
    private router: Router,
    private toast: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeGameForm();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submitGameForm(): void {
    const GAME_DATA = this.gameForm.value;
    GAME_DATA['selectedPlatform'] = GAME_DATA['selectedPlatform'].toLowerCase();

    this.createGameData = new CreateGameInputModel(
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
      []
    );

    this.gameService
      .createGame(this.createGameData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.toast.success(`${GAME_DATA['title']} successfully created!`);
        this.router.navigate(['/game/all']);
      });
  }

  public initializeGameForm(): void {
    this.gameForm = this.fb.group({
      title: 
        [
          '', 
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
      image:
        [
          '',
          [Validators.required]
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
          [Validators.required]
        ],
      release: 
        [
          '', 
          [Validators.required]
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
          [Validators.required]
        ],
      price: 
        [
          0, 
          [Validators.required, Validators.min(5), Validators.pattern(/^\d+$/)]
        ]
    });
  }

  public get title(): AbstractControl {
    return this.gameForm.get('title');
  }

  public get image(): AbstractControl {
    return this.gameForm.get('image');
  }

  public get publisher(): AbstractControl {
    return this.gameForm.get('publisher');
  }

  public get developer(): AbstractControl {
    return this.gameForm.get('developer');
  }

  public get series(): AbstractControl {
    return this.gameForm.get('series');
  }

  public get selectedPlatform(): AbstractControl {
    return this.gameForm.get('selectedPlatform');
  }

  public get release(): AbstractControl {
    return this.gameForm.get('release');
  }

  public get genre(): AbstractControl {
    return this.gameForm.get('genre');
  }

  public get description(): AbstractControl {
    return this.gameForm.get('description');
  }

  public get mode(): AbstractControl {
    return this.gameForm.get('mode');
  }

  public get price(): AbstractControl {
    return this.gameForm.get('price');
  }
}
