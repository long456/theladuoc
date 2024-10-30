import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {take} from "rxjs";
import {FileManagerService} from "../../services/file-manager.service";

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectorComponent),
      multi: true
    }
  ]
})
export class FileSelectorComponent implements ControlValueAccessor{
  @Input() value: string | null = null;
  @Input() status: "" | "error" | "warning" = "";
  disabled: boolean = false;

  constructor(
    private fileManagerService: FileManagerService,
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

  onBtnClick() {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.value = data;
    });
  }
}
