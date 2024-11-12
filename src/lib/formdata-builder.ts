import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { ZodSchema } from 'zod';

export const formDataBuilder = <T extends FieldValues>(
  getValues: UseFormGetValues<T>
) => {
  const values = getValues();
  const formDataObject = new FormData();

  Object.keys(values).forEach((key) => {
    formDataObject.append(key, values[key]);
  });

  return formDataObject;
};

export const formDataParser = <T>(data: FormData, schema: ZodSchema<T>) => {
  const formObject: Record<string, unknown> = {};

  data.forEach((value, key) => {
    formObject[key] = value;
  });

  return schema.parse(formObject);
};
