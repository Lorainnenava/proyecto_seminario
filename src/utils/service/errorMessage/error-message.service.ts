import { Injectable } from '@angular/core';
import { ValidationsService } from '../validation/validations.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor(private validationService: ValidationsService) {}

  getFirstErrorMessage(
    FormControl: FormGroup<any>,
    controlName: string
  ): string {
    const control = FormControl.get(controlName);
    if (control && control.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return this.validationService.getErrorMessage(
        firstErrorKey,
        control.errors[firstErrorKey]
      );
    }
    return '';
  }
}
