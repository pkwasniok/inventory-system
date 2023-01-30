import {
  type ReactNode,
  type ReactElement,
  type FormHTMLAttributes,
  type FormEvent,
  createContext,
  useState,
  useContext,
  cloneElement,
} from 'react';

import { type ZodType } from 'zod';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  chakra,
  FormHelperText,
  Flex,
  Button,
  type ButtonProps,
  Card,
} from '@chakra-ui/react';



// form context -- provides errors and default values from form fields
interface FormContext {
  defaultValues: { [key: string]: string };
  errors: { [key: string]: string };
};

const FormContext = createContext<FormContext>({ defaultValues: {}, errors: {} });



// main form component
interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'|'onChange'> {
  children?: ReactNode;
  schema?: ZodType<T>;
  defaultValues?: T;
  onSubmit?: (values: T) => void;
  onChange?: (values: T) => void;
  isOutlined?: boolean;
  w?: string|number;
  resetOnSubmit?: boolean;
};

export const Form = function Form<T> ({ children, defaultValues = {}, isOutlined, onSubmit, onChange, schema, w, resetOnSubmit, ...props }: FormProps<T>) {
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

    if (resetOnSubmit === true) {
      e.currentTarget.reset();
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

  if (isOutlined) {
    return (
      <Card
        variant="outline"
        p={6}
        w={w}
      >
        <FormContext.Provider value={{ errors, defaultValues: defaultValues as { [key: string]: string } ?? {} }}>
          <chakra.form
            flexDirection="column"
            gap={6}
            w="100%"
            onSubmit={handleSubmit}
            onChange={handleChange}
            {...props}
          >
            {children}
          </chakra.form>
        </FormContext.Provider>
      </Card>
    );
  } else {
    return (
      <FormContext.Provider value={{ errors, defaultValues: defaultValues as { [key: string]: string } }}>
        <chakra.form
          flexDirection="column"
          gap={3}
          w={w}
          onSubmit={handleSubmit}
          onChange={handleChange}
          {...props}
        >
          {children}
        </chakra.form>
      </FormContext.Provider>
    );
  }
}



// form field wrapper
interface FormFieldProps {
  children: ReactElement;
  name: string;
  label?: string;
  hint?: string;
};

const Field = ({ children, name, label, hint }: FormFieldProps) => {
  const context = useContext(FormContext);

  return (
    <FormControl isInvalid={context.errors[name] != undefined} mb={3}>
      {label != undefined &&
        <FormLabel>{label}</FormLabel>
      }

      {cloneElement(children, {
        name,
        defaultValue: name != undefined ? context.defaultValues[name] : undefined,
      })}

      <FormErrorMessage>
        {context.errors[name]}
      </FormErrorMessage>

      <FormHelperText>
        {hint}
      </FormHelperText>
    </FormControl>
  );
}

Form.Field = Field;



// form submit button
interface FormSubmitProps extends Omit<ButtonProps, 'type'|'onClick'> {
  align?: 'left'|'center'|'right';
}

const Submit = ({ align, children, ...props }: FormSubmitProps) => {
  return (
    <Flex
      w="100%"
      mt={6}
      direction="row"
      justifyContent={align === 'left' ? 'start' : (align === 'right' ? 'end' : 'center')}
    >
      <Button
        type="submit"
        w={align == undefined ? '100%' : undefined}
        {...props}
      >
        {children}
      </Button>
    </Flex>
  )
}

Form.Submit = Submit;



interface FormValueProps {
  name: string;
  value?: string | number;
};

const Value = ({ name, value }: FormValueProps) => {
  const context = useContext(FormContext);

  return (
    <chakra.input
      name={name}
      value={value ?? context.defaultValues[name]}
      hidden
    />
  );
}

Form.Value = Value;
