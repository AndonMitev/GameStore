import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(games: any, searchedValue: any): any {
    if (!searchedValue) {
      return games;
    }

    return games.filter(game =>
      game.title.toLowerCase().includes(searchedValue.toLowerCase())
    );
  }
}
