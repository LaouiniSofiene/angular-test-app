import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})

export class FormInputComponent {

  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  
  get errorKeys() {
    return Object.keys(this.control.errors || {});
  }

  getErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return `${this.label} is required.`;
      case 'email':
        return 'Please enter a valid email address.';
      case 'minlength':
        return `The ${this.label} must be at least ${this.control.errors?.['minlength']?.requiredLength} characters long.`;
      case 'pattern':
        if (this.label === 'Password') {
          return 'Password must be 8 characters long with at least one character and one special character.';
        }
        return 'Invalid format.';
      default:
        return ''; // or a generic message
    }
  }
}
