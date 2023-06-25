import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidatos from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.validatorsServices.firstNameAndLastnamePattern )]],
    email: ['', [Validators.required, Validators.pattern( this.validatorsServices.emailPattern )], [ this.emailValidatorService ]],
    username: ['', [Validators.required, this.validatorsServices.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },{
    validators: [
      this.validatorsServices.isFieldOneEqualToFieldTwo('password', 'password2')
    ]
  })

  constructor(
    private fb : FormBuilder,
    private validatorsServices: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) { }

  isValidField( field: string ){
    return this.validatorsServices.isValidField( this.myForm, field );
  }

  onSubmit(){
    this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
  }
}
