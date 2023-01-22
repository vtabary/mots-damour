import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { IFilter } from '../../directives/cssfilter/cssfilter.directive';

export type ICameraConf = {
  filter: IFilter;
  simpleTint: string;
};

@Component({
  selector: 'visual-show-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent implements OnInit, OnDestroy {
  public static readonly storageName = 'visual-show/camera';

  public form = new FormGroup({
    filter: new FormControl<IFilter>('none', {
      nonNullable: true,
      validators: Validators.required,
    }),
    simpleTint: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
  public hiddenVideo = false;

  private onDestroy$ = new Subject<void>();

  constructor(
    private localStorage: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.form.setValue(
      this.localStorage.get<ICameraConf>(
        `${ControlsComponent.storageName}/config`
      ) ??
        ({
          filter: 'none',
          simpleTint: '',
        } as ICameraConf)
    );

    this.hiddenVideo =
      this.localStorage.get<boolean>(
        `${ControlsComponent.storageName}/display`
      ) ?? false;

    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.updateCamera());
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(undefined);
  }

  @HostListener('window:keydown', ['$event'])
  public onSpace(event: KeyboardEvent) {
    if (
      !(event.key == ' ' || event.code == 'Space' || event.keyCode == 32) &&
      !(event.key === 'PageDown' || event.code === 'PageDown') &&
      !(event.key === 'PageUp' || event.code === 'PageUp')
    ) {
      return;
    }

    this.hiddenVideo = !this.localStorage.get(
      `${ControlsComponent.storageName}/display`
    );
    this.localStorage.set(
      `${ControlsComponent.storageName}/display`,
      this.hiddenVideo
    );

    this.cdr.detectChanges();
  }

  private updateCamera(): void {
    window.localStorage.setItem(
      `${ControlsComponent.storageName}/config`,
      JSON.stringify(this.form.value)
    );
  }
}
