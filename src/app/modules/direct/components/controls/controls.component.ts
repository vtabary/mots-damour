import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { IFilter } from '../../directives/cssfilter/cssfilter.directive';

export type ICameraConf = {
  filter: IFilter;
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
  });

  private onDestroy$ = new Subject<void>();

  constructor(private localStorage: LocalStorageService<ICameraConf>) {}

  public ngOnInit(): void {
    this.localStorage
      .observe(ControlsComponent.storageName)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        console.log('ok controls', value);
      });

    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.updateCamera());
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(undefined);
  }

  private updateCamera(): void {
    console.log('ok2');
    window.localStorage.setItem(
      ControlsComponent.storageName,
      JSON.stringify(this.form.value)
    );
  }
}
