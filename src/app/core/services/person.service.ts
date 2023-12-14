import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends Repository<Person> {

    constructor() {
      super('persons');
    }
}
