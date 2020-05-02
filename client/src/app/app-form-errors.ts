import {translate} from "@ngneat/transloco";

export const formErrors = {
  required: error => translate('form-validation.required'),
  email: error => translate('form-validation.valid-email'),
  minlength: ({ requiredLength }) => translate('form-validation.min-length', {requiredLength}),
};
