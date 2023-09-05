import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data.service'; // Adjust path if necessary

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  formData: any = {}; // Initialized to an empty object
  csvData: string[][] = []; // Initialized to an empty array

  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();
    this.csvData = this.formDataService.getCsvData();
  }
}
