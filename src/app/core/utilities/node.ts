import { firstValueFrom, Observable } from 'rxjs';
import { Database, object, ref, update } from '@angular/fire/database';
import { Schema } from 'zod';
import { map } from 'rxjs/operators';

export class Node<T> {
  constructor(
    protected database: Database,
    protected path: string,
    protected schema: Schema<T>,
    protected defaultValue: () => T
  ) {}

  get$(): Observable<T> {
    return object(ref(this.database, this.path)).pipe(
      map((queryChange) => this.schema.parse(queryChange.snapshot.val() ?? this.defaultValue()))
    );
  }

  get(): Promise<T> {
    return firstValueFrom(this.get$());
  }

  async update(element: Partial<T>): Promise<void> {
    return update(ref(this.database, this.path), element);
  }
}
