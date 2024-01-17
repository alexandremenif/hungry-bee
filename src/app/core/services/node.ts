import { Observable } from 'rxjs';
import { Database, DataSnapshot, get, object, ref, update } from '@angular/fire/database';
import { Schema } from 'zod';
import { map } from 'rxjs/operators';

export class Node<T> {
  ref = ref(this.database, this.path);

  constructor(
    protected database: Database,
    protected path: string,
    protected schema: Schema<T>,
    protected defaultValue: () => T
  ) {}

  get$(): Observable<T> {
    return object(this.ref).pipe(map((queryChange) => this.read(queryChange.snapshot)));
  }

  get(): Promise<T> {
    return get(this.ref).then((snapshot) => this.read(snapshot));
  }

  async update(element: Partial<T>): Promise<void> {
    return update(this.ref, element);
  }

  private read(snapshot: DataSnapshot): T {
    return this.schema.parse(snapshot.val() ?? this.defaultValue());
  }
}
