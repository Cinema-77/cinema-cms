import { Input, FormControlProps } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

interface InputFieldProps extends FieldWrapperPassThroughProps, FormControlProps {
  type?: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { type = 'text', label, registration, error, ...formProps } = props;

  return (
    <FieldWrapper label={label} error={error} {...formProps}>
      <Input type={type} autoFocus aria-label={label} {...registration} />
    </FieldWrapper>
  );
};
