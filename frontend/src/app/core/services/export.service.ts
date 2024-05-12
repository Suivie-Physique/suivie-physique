import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor() { }

    // Add your service methods here

    convertToCSV(objArray: any): string {
        const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';
    
        for (let index in objArray[0]) {
          row += index + ',';
        }
    
        row = row.slice(0, -1);
        str += row + '\r\n';
    
        for (let i = 0; i < array.length; i++) {
          let line = '';
    
          for (let index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
          }
    
          str += line + '\r\n';
        }
        return str;
    }

    downloadCSV(data: any, filename: string): void {
        const csvData = this.convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, filename);
    }




}