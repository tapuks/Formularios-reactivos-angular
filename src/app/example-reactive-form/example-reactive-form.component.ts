import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { legalAgeValidator, validDNIValidator } from '../exampleValidators';
import { calculateAge, createDate, isCandidateForPermanentDNI } from '../utilities';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  styleUrls: ['./example-reactive-form.component.scss']
})
export class ExampleReactiveFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  isCandidateForPermanentDNI = false;

  formExample: FormGroup = this._formBuilder.group({
    age: [],
    birthdate: [, legalAgeValidator()],
    email: [, [Validators.pattern(/@caser.com$/)]],
    name: [, [Validators.required, Validators.pattern('^[A-Za-z]*$')]],
    dniexpirydate: [, validDNIValidator()],
    address: this._addressFormBuilder(),

  });;
  formAddress: any;

  ngOnInit() {
    //age logic
    const ageControl = this.formExample.get('age');
    ageControl?.disable();

    this.formExample.get('birthdate')?.valueChanges.subscribe((birthdateString) => {
      const birthDate = createDate(birthdateString);
      ageControl?.setValue(calculateAge(birthDate));

      //Permanent DNIlogic
      if (isCandidateForPermanentDNI(birthDate)) {
        this.formExample.removeControl('dniexpirydate');
        this.formExample.addControl('permanentdni', this._formBuilder.control(false))
        this.isCandidateForPermanentDNI = true;
      }
      else {
        this.isCandidateForPermanentDNI = false;
        this.formExample.addControl('dniexpirydate', this._formBuilder.control('', validDNIValidator()))
      }
    })
  }

  private _addressFormBuilder(): FormGroup {
    return (this.formAddress = this._formBuilder.group({
      street: [],
      city: [],
      postalcode: [],
    }));
  }

  clean() {
    this.formExample.reset();
  }

  log() {
    console.log(this.formExample.value);
  }
}
