import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service'; // Adjust path if necessary

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  form!: FormGroup;
  cumulativeError: string = '';
  csvContent: string[] = [];
  selectedFile?: File;


  constructor(private router: Router, private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subscription: new FormControl('Advanced', Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\W)[A-Za-z\d\W]{8,}$/)]),
      file: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.cumulativeError = this.generateCumulativeErrorMessage();
    } else {
      // Store the data in the service.
      this.formDataService.setFormData(this.form.value);
      this.formDataService.setCsvData(this.csvContent.map(line => line.split(',')));
      
      // Navigate to the results page.
      this.router.navigate(['/result']);
    }
  }

  onClear(): void {
    if (this.form.dirty) {
      if (confirm("Are you sure you want to discard the changes?")) {
        this.form.reset();
      }
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      this.selectedFile = input.files[0]; // Storing the file in the component property
      
      const reader = new FileReader();
      reader.readAsText(this.selectedFile);
      
      reader.onload = () => {
        this.csvContent = (reader.result as string).split('\n');
      };
    }
}

  generateCumulativeErrorMessage(): string {
    const errors: string[] = [];

    if (this.form.get('firstName')!.invalid) {
      errors.push('First Name is invalid.');
    }

    if (this.form.get('lastName')!.invalid) {
      errors.push('Last Name is invalid.');
    }

    if (this.form.get('email')!.invalid) {
      errors.push('Email is invalid.');
    }

    if (this.form.get('password')!.invalid) {
      errors.push('Password is invalid.');
    }

    if (this.form.get('file')!.invalid) {
      errors.push('CSV file is required.');
    }

    return errors.join(' ');
  }
}
