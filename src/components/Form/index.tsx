import { type ReactNode, type ReactElement, type FormHTMLAttributes, type FormEvent,createContext, cloneElement, useContext, useState } from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { type ZodType } from 'zod';



interface FormContext {
  errors: { [key: string]: string };
  defaultValues: { [key: string]: string };
}

const FormContext = createContext<FormContext|undefined>(undefined);



interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'|'onChange'> {
  children: ReactNode;
  defaultValues?: { [key: string]: string };
  schema?: ZodType<T>;
  onSubmit?: (data: T) => void;
  onChange?: (data: T) => void;
  w?: number;
}

const Form = function Form<T> ({ children, defaultValues = {}, schema, onSubmit, onChange, w }: FormProps<T>) {
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({});
  const [ validateOnChange, setValidateOnChange ] = useState(false);

  const getFormValues = (e: FormEvent<HTMLFormElement>) => {
    const form: { [key: string]: { name: string; value: string } } = e.currentTarget;

    const values = new Map<string, string>();
    for (let i=0; i<e.currentTarget.length; i++) {
      const name = form[i]?.name;
      const value = form[i]?.value;

      if (name != undefined && value != undefined && name != '') {
        values.set(name, value);
      }
    }

    return Object.fromEntries(values);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let values = getFormValues(e) as T;

    if (schema != undefined) {
      const result = schema.safeParse(values);

      if (result.success == true) {
        values = result.data;
        setErrors({});
      } else {
        const errors: { [key: string]: string } = {};
        result.error.issues.forEach((issue) => {
          if (issue.path != undefined && issue.path.length > 0) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors({ ...errors });
        setValidateOnChange(true);
        return;
      }
    }

    if (onSubmit != undefined) {
      onSubmit(values);
    }
  }

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    let values = getFormValues(e) as T;

    if (schema != undefined && validateOnChange == true) {
      const result = schema.safeParse(values);

      if (result.success == true) {
        values = result.data;
        setErrors({});
        setValidateOnChange(false);
      } else {
        const errors: { [key: string]: string } = {};
        result.error.issues.forEach((issue) => {
          if (issue.path != undefined && issue.path.length > 0) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors({ ...errors });
        return;
      }
    }

    if (onChange != undefined) {
      onChange(values);
    }
  }

  return (
    <FormContext.Provider value={{ errors, defaultValues }}>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        style={{ width: w != undefined ? `${w}px` : '100%'}}
      >
        <Flex
          direction="column"
          gap={3}
        >
          {children}
        </Flex>
      </form>
    </FormContext.Provider>
  )
}



interface FormFieldProps {
  children: ReactElement;
  label?: string;
  name: string;
  isRequired?: boolean;
}

const Field = ({ children, label, name, isRequired }: FormFieldProps) => {
  const context = useContext(FormContext);

  return (
    <FormControl isInvalid={context?.errors[name] != undefined} isRequired={isRequired}>
      {label != undefined &&
        <FormLabel>{label}</FormLabel>
      }

      {cloneElement(children, { name: name, defaultValue: context?.defaultValues[name] })}

      {context?.errors[name] != undefined &&
        <FormErrorMessage>{context.errors[name]}</FormErrorMessage>
      }
    </FormControl>
  )
}

Form.Field = Field;



export default Form;
