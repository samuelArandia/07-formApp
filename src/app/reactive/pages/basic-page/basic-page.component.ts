import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';

const rxt5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 10
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  //Primera forma de crear un formulario reactivo

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });

  //Segunda forma de crear un formulario reactivo

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor( private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    // this.myForm.reset(rxt5090);
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field].errors ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`;
        default:
          return 'Error en el campo';
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 10, inStorage: 0 });
  }
}
