import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { calculateAge, createDate } from '../app/utilities';

const defaultLegalAge = 18;

export function legalAgeValidator(legalAge = defaultLegalAge): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let hasLegalAge = false;

        if (control.value) {
            hasLegalAge = calculateAge(createDate(control.value)) >= legalAge;
        }

        return hasLegalAge ? null : { nonLegalAge: { birthdate: control.value } };
    };
}


export function validDNIValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let validDNI = false;
        if (control.value) {
            validDNI = createDate(control.value) > new Date();
        }
        return validDNI
            ? null
            : { nonValidDNI: { expirationDate: control.value } };
    };
}

