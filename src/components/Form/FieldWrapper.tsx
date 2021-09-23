import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

interface FieldWrapperProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children, className, ...formProps } = props;
  return (
    <FormControl className={className} isInvalid={!!error} {...formProps}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
