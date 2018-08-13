import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//Model
import { CreateGameInputModel } from '../../../core/models/input-models/create-game.model';
//Service
import { CreateGameService } from '../../../core/services/game-store-services/create-game.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  private gameForm: FormGroup;
  private subscription: Subscription;
  private createGameData: CreateGameInputModel;
  private platforms: string[] = [
    'PS4',
    'PS3',
    'PC',
    'Xbox360',
    'XboxOne',
    'UpComming'
  ];
  private modes: string[] = ['Single-player', 'Multiplayer'];

  constructor(
    private fb: FormBuilder,
    private createGameService: CreateGameService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submitGameForm(): void {
    const gameData = this.gameForm.value;
    gameData['selectedPlatform'] = gameData['selectedPlatform'].toLowerCase();
    this.createGameData = new CreateGameInputModel(
      gameData['title'],
      gameData['image'],
      gameData['publisher'],
      gameData['developer'],
      gameData['series'],
      gameData['selectedPlatform'],
      gameData['release'],
      gameData['genre'],
      gameData['description'],
      gameData['mode'],
      Number(gameData['price'])
    );

    this.subscription = this.createGameService
      .createGame(this.createGameData)
      .subscribe(res => {
        this.toast.success(`${gameData['title']} successfully created!`);
        this.router.navigate(['/game/all']);
      });
  }

  initializeForm(): void {
    this.gameForm = this.fb.group({
      title: ['Call of Duty', Validators.required],
      image: [
        'https://i.ytimg.com/vi/PCGydpJXIOg/maxresdefault.jpg',
        Validators.required
      ],
      publisher: ['Call of Duty', Validators.required],
      developer: ['Call of Duty', Validators.required],
      series: ['Call of Duty', Validators.required],
      selectedPlatform: ['PS4', Validators.required],
      release: ['2012-03-15', Validators.required],
      genre: ['Call of Duty', Validators.required],
      description: [
        'Call of DutyCall of DutyCall of Duty',
        Validators.required
      ],
      mode: ['Multiplayer', Validators.required],
      price: [33, [Validators.required, Validators.min(5)]]
    });
  }

  get title(): AbstractControl {
    return this.gameForm.get('title');
  }

  get image(): AbstractControl {
    return this.gameForm.get('image');
  }

  get publisher(): AbstractControl {
    return this.gameForm.get('publisher');
  }

  get developer(): AbstractControl {
    return this.gameForm.get('developer');
  }

  get series(): AbstractControl {
    return this.gameForm.get('series');
  }

  get selectedPlatform(): AbstractControl {
    return this.gameForm.get('selectedPlatform');
  }

  get release(): AbstractControl {
    return this.gameForm.get('release');
  }

  get genre(): AbstractControl {
    return this.gameForm.get('genre');
  }

  get description(): AbstractControl {
    return this.gameForm.get('description');
  }

  get mode(): AbstractControl {
    return this.gameForm.get('mode');
  }

  get price(): AbstractControl {
    return this.gameForm.get('price');
  }
}
