import { Checkbox, CheckboxGroup, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

interface CheckBoxFieldProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: string[];
}

export const CheckBoxField: React.FC<CheckBoxFieldProps> = (props) => {
  const { label, options, error, defaultValue, registration } = props;
  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <Wrap>
          {options.map((o, index) => (
            <WrapItem key={`${index}-${o}`}>
              <Checkbox value={o} {...registration}>
                {o}
              </Checkbox>
            </WrapItem>
          ))}
        </Wrap>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
