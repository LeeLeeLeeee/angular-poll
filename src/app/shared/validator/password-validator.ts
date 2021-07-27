import { AbstractControl } from "@angular/forms";

export class PasswordValidator {
    static match(form : AbstractControl) {
        const password = form.get('password').value;
        const confirmPassword = form.get('confirm_password').value;

        if(password !== confirmPassword) {
            return { match: {password, confirmPassword}}
        } else {
            return null
        }
    }
}
