import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public get<T>(name: string): T | undefined {
    const value = window.localStorage.getItem(name);
    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  }

  public set<T>(name: string, value: T): void {
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  public observe<T>(name: string): Observable<T | undefined> {
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((e) => e.storageArea === window.localStorage),
      map(() => this.get(name))
    );
  }
}
