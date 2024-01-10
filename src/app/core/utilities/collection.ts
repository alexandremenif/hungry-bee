import { firstValueFrom, map, Observable } from 'rxjs';
import { Database, get, object, push, ref, remove, update } from '@angular/fire/database';
import { Schema, z } from 'zod';

export class Collection<T> {
  constructor(
    protected database: Database,
    protected path: string,
    protected schema: Schema<T>
  ) {}

  getAll$(): Observable<Record<string, T>> {
    return object(ref(this.database, this.path)).pipe(
      map((queryChange) => z.record(this.schema).parse(queryChange.snapshot.val() ?? {}))
    );
  }

  get$(key: string): Observable<T | undefined> {
    return object(ref(this.database, this.childPath(key))).pipe(
      map((queryChange) => this.schema.parse(queryChange.snapshot.val()))
    );
  }

  getAll(): Promise<Record<string, T>> {
    return firstValueFrom(this.getAll$());
  }

  get(key: string): Promise<T | undefined> {
    return firstValueFrom(this.get$(key));
  }

  async size(): Promise<number> {
    return (await get(ref(this.database, this.path))).size;
  }

  async remove(key: string): Promise<void> {
    return remove(ref(this.database, this.childPath(key)));
  }

  async add(element: T): Promise<string | null> {
    return push(ref(this.database, this.path), element).then(({ key }) => key);
  }

  async update(key: string, element: Partial<T>): Promise<void> {
    return update(ref(this.database, this.childPath(key)), element);
  }

  protected childPath(key: string): string {
    return `${this.path}/${key}`;
  }
}
