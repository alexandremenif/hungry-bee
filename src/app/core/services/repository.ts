import { inject } from '@angular/core';
import { Database, get, object, push, ref, remove, update } from '@angular/fire/database';
import { firstValueFrom, map, Observable } from 'rxjs';

export class Repository<T> {
  readonly database = inject(Database);

  constructor(readonly rootPath: string) {}

  getAll$(): Observable<Record<string, T>> {
    return object(ref(this.database, this.rootPath)).pipe(map((queryChange) => queryChange.snapshot.val()));
  }

  get$(key: string): Observable<T> {
    return object(ref(this.database, this.path(key))).pipe(map((queryChange) => queryChange.snapshot.val()));
  }

  getAll(): Promise<Record<string, T>> {
    return firstValueFrom(this.getAll$());
  }

  get(key: string): Promise<T> {
    return firstValueFrom(this.get$(key));
  }

  async size(): Promise<number> {
    return (await get(ref(this.database, this.rootPath))).size;
  }

  async remove(key: string): Promise<void> {
    return remove(ref(this.database, this.path(key)));
  }

  async add(element: T): Promise<void> {
    return push(ref(this.database, this.rootPath), element).then();
  }

  async update(key: string, element: Partial<T>): Promise<void> {
    return update(ref(this.database, this.path(key)), element);
  }

  protected path(key: string): string {
    return `${this.rootPath}/${key}`;
  }
}
