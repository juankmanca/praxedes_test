import { FormGroup } from "@angular/forms";

export default class FormMessages {

  static get(frm: FormGroup, campo: string): string {

    if (!frm) { return ''; }

    let error = String();

    const control = frm.get(campo);

    if (control && control.touched && control.errors !== null) {

      if (control.errors["required"] !== undefined) {
        error = 'Campo requerido';
      } else if (control.errors['maxlength'] !== undefined) {
        error = `Máx. longitud (${control.errors['maxlength'].requiredLength})`;
      } else if (control.errors['minlength'] !== undefined) {
        error = `Min. longitud (${control.errors['minlength'].requiredLength})`;
      } else if (control.errors['email'] !== undefined) {
        error = 'E-mail incorrecto.';
      } else if (control.errors['pattern']) {
        error = 'Formato incorrecto'
      }
    }

    return error;
  }
}