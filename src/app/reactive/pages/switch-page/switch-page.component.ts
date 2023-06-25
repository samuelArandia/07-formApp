import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switch-page.component.html',

})
export class SwitchPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender:[ 'M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  public person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.myForm.reset({ ...this.person });
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave() {
    console.log('Saved');
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(newPerson);
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
