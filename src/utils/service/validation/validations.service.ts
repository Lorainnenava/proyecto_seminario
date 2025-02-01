import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  // Método genérico para obtener mensajes de error
  getErrorMessage(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return 'Campo obligatorio.';
      case 'minlength':
        return `Mínimo ${errorValue.requiredLength} caracteres.`;
      case 'maxlength':
        return `Máximo ${errorValue.requiredLength} caracteres.`;
      case 'pattern':
        return 'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.';
      case 'email':
        return 'Correo invalido.';
      default:
        return 'Error desconocido.';
    }
  }
}
