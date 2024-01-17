import { map, Observable } from 'rxjs';
import {
  Database,
  DatabaseReference,
  DataSnapshot,
  get,
  object,
  push,
  ref,
  remove,
  update
} from '@angular/fire/database';
import { Schema, z } from 'zod';

export class Collection<T> {
  private ref = ref(this.database, this.path);

  constructor(
    protected database: Database,
    protected path: string,
    protected schema: Schema<T>
  ) {}

  private childRef(key: string): DatabaseReference {
    return ref(this.database, `${this.path}/${key}`);
  }

  getAll$(): Observable<Record<string, T>> {
    return object(this.ref).pipe(map((queryChange) => this.readAll(queryChange.snapshot)));
  }

  get$(key: string): Observable<T | undefined> {
    return object(this.childRef(key)).pipe(map((queryChange) => this.read(queryChange.snapshot)));
  }

  getAll(): Promise<Record<string, T>> {
    return get(this.ref).then((snapshot) => this.readAll(snapshot));
  }

  get(key: string): Promise<T | undefined> {
    return get(this.childRef(key)).then((snapshot) => this.read(snapshot));
  }

  async size(): Promise<number> {
    return (await get(this.ref)).size;
  }

  async remove(key: string): Promise<void> {
    return remove(this.childRef(key));
  }

  async add(element: T): Promise<string | null> {
    return push(this.ref, element).then(({ key }) => key);
  }

  async update(key: string, element: Partial<T>): Promise<void> {
    return update(this.childRef(key), element);
  }

  private read(snapshot: DataSnapshot): T {
    return this.schema.parse(snapshot.val());
  }

  private readAll(snapshot: DataSnapshot): Record<string, T> {
    return z.preprocess((val) => val ?? {}, z.record(this.schema)).parse(snapshot.val());
  }
}
