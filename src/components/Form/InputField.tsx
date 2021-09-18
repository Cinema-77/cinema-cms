import { Input } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

interface InputFieldProps extends FieldWrapperPassThroughProps {
  type?: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { type = 'text', label, registration, error } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <Input type={type} autoFocus aria-label={label} {...registration} />
    </FieldWrapper>
  );
};
