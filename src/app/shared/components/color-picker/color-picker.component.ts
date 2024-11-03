import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor{
  @Input() value: string = '#ffffff';
  disabled: boolean = false;

  // Function to call when value changes
  onChange: any = () => {};

  // Function to call when input is touched
  onTouched: any = () => {};

  // Write value to the component
  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }

  // Register onChange callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register onTouched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Set disabled state
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handle color input changes
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // Handle text input changes
  onTextInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (colorRegex.test(input.value)) {
      this.value = input.value;
      this.onChange(this.value);
    }
    this.onTouched();
  }
}
