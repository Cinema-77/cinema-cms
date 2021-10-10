import { Checkbox, CheckboxGroup, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

interface CheckBoxFieldGroupProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: string[];
  children?: React.ReactNode;
}

export const CheckBoxFieldGroup: React.FC<CheckBoxFieldGroupProps> = (props) => {
  const { label, options, error, defaultValue, registration } = props;

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <SimpleGrid columns={[2, null, 3]} spacing="5px">
          {options.map((o, index) => (
            <Checkbox value={o} {...registration} key={index}>
              {o}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
