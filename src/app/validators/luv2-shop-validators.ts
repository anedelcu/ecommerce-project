import { FormControl, ValidationErrors } from "@angular/forms";


export class Luv2ShopValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {

        // check is the sapce contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0 )) {
             // invalid, return errors
             return { 'notOnlyWhitespace': true};
        }
        else {
            return null;
        }


        
    }
}
