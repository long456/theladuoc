import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileManagerService} from "../../services/file-manager.service";
import {take} from "rxjs";
import {VideoManagerService} from "../../services/video-manager.service";

@Component({
  selector: 'app-video-selector',
  templateUrl: './video-selector.component.html',
  styleUrls: ['./video-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VideoSelectorComponent),
      multi: true
    }
  ]
})
export class VideoSelectorComponent implements ControlValueAccessor{
  @Input() value: string | null = null;
  @Input() status: "" | "error" | "warning" = "";
  disabled: boolean = false;

  constructor(
    private videoManagerService: VideoManagerService,
  ) {}

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onBtnClick(): void {
    this.videoManagerService.onSelectFile();
    this.videoManagerService.selectedVideo.pipe(take(1)).subscribe((data) => {
      this.value = data;
      this.onChange(this.value);
      this.onTouched();
    });
  }
}
