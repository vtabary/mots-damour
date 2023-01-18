import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import createPanZoom from 'panzoom';
import { startWith, Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../../shared/public-api';
import { IFilter } from '../../directives/cssfilter/cssfilter.directive';
import { ICameraConf } from '../controls/controls.component';

@Component({
  selector: 'visual-show-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraComponent implements OnInit, AfterViewInit {
  public static readonly storageName = 'visual-show/camera';

  @ViewChild('video')
  public video: ElementRef | null = null;

  public cameraStarted = false;
  public filter: IFilter = 'none';

  private onDestroy$ = new Subject<void>();

  constructor(
    private localStorage: LocalStorageService<ICameraConf>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.localStorage
      .observe(CameraComponent.storageName)
      .pipe(
        takeUntil(this.onDestroy$),
        startWith(this.localStorage.get(CameraComponent.storageName))
      )
      .subscribe((value) => {
        this.filter = value?.filter || 'none';
        this.cdr.detectChanges();
      });
  }

  public async ngAfterViewInit(): Promise<void> {
    return this.displayCamera();
  }

  private async displayCamera(): Promise<void> {
    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      !this.video
    ) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      (this.video.nativeElement as HTMLVideoElement).srcObject = stream;
      this.video.nativeElement.play();

      this.zone.runOutsideAngular(() =>
        createPanZoom(this.video?.nativeElement, {
          minZoom: 1,
          smoothScroll: false,
        })
      );
    } catch (e) {
      console.log(
        'Error during starting video. Try to restart your browser',
        e
      );
    }
  }
}
