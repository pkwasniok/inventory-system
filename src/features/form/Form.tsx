import {
  type ReactNode,
  type ReactElement,
  type FormHTMLAttributes,
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
};

export const Form = function Form<T> ({ children, defaultValues, isOutlined, onSubmit, onChange, schema, w, ...props }: FormProps<T>) {
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({});

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
            gap={3}
            w="100%"
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
  name?: string;
  label?: string;
  hint?: string;
};

const Field = ({ children, name, label, hint }: FormFieldProps) => {
  const context = useContext(FormContext);

  return (
    <FormControl>
      {label != undefined &&
        <FormLabel>{label}</FormLabel>
      }

      {cloneElement(children, {
        name,
        defaultValue: name != undefined ? context.defaultValues[name] : undefined,
      })}

      {name != undefined && context.errors[name] != undefined
        ? <FormErrorMessage mb={3}>{context.errors[name]}</FormErrorMessage>
        : <FormHelperText mb={3}>{hint}</FormHelperText>
      }
    </FormControl>
  );
}

Form.Field = Field;



// form submit button
interface FormSubmitProps extends ButtonProps {
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
        {...props}
      >
        {children}
      </Button>
    </Flex>
  )
}

Form.Submit = Submit;
