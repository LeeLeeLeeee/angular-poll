import { FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';


const checkDuplicate = (formArray: FormArray) : string[] => {
    let duplicatedValueArray = []
    const values = formArray.value;
    formArray.controls.reduce((_: any, control: FormControl, index: number) => {
        if(!control.value) return true;
        const findIndex = values.indexOf(control.value);
        if(findIndex !== index) {
            duplicatedValueArray.push(control.value);
        }
        return duplicatedValueArray;
    }, duplicatedValueArray)

    return duplicatedValueArray
}

export const checkDuplicatedValidator = () : ValidatorFn => {
    return (formArray: FormArray) : ValidationErrors | null => {
        const duplicatedValueArray = checkDuplicate(formArray)
        return duplicatedValueArray.length > 0 ? { duplicated: duplicatedValueArray } : null
    }
}
