import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T = Record<string, unknown>> {
  public get(name: string): T | undefined {
    const value = window.localStorage.getItem(name);
    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  }

  public set(name: string, value: T): void {
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  public observe(name: string): Observable<T | undefined> {
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((e) => e.storageArea === window.localStorage),
      map(() => this.get(name))
    );
  }
}
