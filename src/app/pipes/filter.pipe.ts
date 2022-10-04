import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'jszip';
import { User } from '../models/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: User[], filterText: string): User[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    return filterText
      ? value.filter(
          (u: User) =>
            u.name.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            u.department.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            u.id.toString().indexOf(filterText) !== -1 ||
            u.privateCode.toString().indexOf(filterText)!==-1 ||
            u.phone.toString().indexOf(filterText)!==-1 ||
            u.company.toLocaleLowerCase().indexOf(filterText)!==-1 ||
            u.surname.toLocaleLowerCase().indexOf(filterText)!==-1

        )
      : value; // öncelikle küçük harfe çeçvir sonra filtere şartlarına uyanları filtreleme
  }
}
