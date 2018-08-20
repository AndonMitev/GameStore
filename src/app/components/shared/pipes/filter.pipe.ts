import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(games: any, searchedGames: any): any {
    if (!searchedGames) {
      return games;
    }

    return games.filter(game =>
      game.title.toLowerCase().includes(searchedGames.toLowerCase())
    );
  }
}
