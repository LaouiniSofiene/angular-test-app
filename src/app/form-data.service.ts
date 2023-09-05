import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: any = {};
  private csvData: string[][] = [];

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  setCsvData(data: string[][]) {
    this.csvData = data;
  }

  getCsvData() {
    return this.csvData;
  }
}
