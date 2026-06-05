import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

type ValidatorFn = (value: string) => boolean;
type FormValidations<T extends Record<string, string>> = Partial<
  Record<keyof T & string, [ValidatorFn, string]>
>;

export const useForm = <T extends Record<string, string>>(
  initialForm: T,
  formValidations: FormValidations<T> = {} as FormValidations<T>,
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<
    Record<string, string | null>
  >({});

  const createValidators = (): void => {
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations) as Array<
      keyof T & string
    >) {
      const validators = formValidations[formField];
      if (!validators) continue;
      const [fn, errorMessage] = validators;

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    } as T);
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
