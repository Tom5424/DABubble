import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'customDate',
  standalone: true,
})


export class CustomDatePipe implements PipeTransform {
  pipe: DatePipe = new DatePipe('en-US');


  transform(date: number) {
    const currentDate = new Date();
    const inputDate = new Date(date);


    if (this.isToday(inputDate, currentDate)) {
      return 'Today';
    } else if (this.isYesterday(inputDate)) {
      return 'Yesterday';
    } else {
      return this.pipe.transform(inputDate, 'EEEE, dd LLLL');
    }
  }


  isToday(inputDate: Date, currentDate: Date): boolean {
    return inputDate.getDate() === currentDate.getDate() && inputDate.getMonth() === currentDate.getMonth() && inputDate.getFullYear() === currentDate.getFullYear();
  }


  isYesterday(inputDate: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return inputDate.getDate() === yesterday.getDate() && inputDate.getMonth() === yesterday.getMonth() && inputDate.getFullYear() === yesterday.getFullYear();
  }
}
