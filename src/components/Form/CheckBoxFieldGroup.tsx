import { Checkbox, CheckboxGroup, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

type Option = {
  label: React.ReactNode;
  value: string | number;
};
interface CheckBoxFieldGroupProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: Option[];
  children?: React.ReactNode;
}

export const CheckBoxFieldGroup: React.FC<CheckBoxFieldGroupProps> = (props) => {
  const { label, options, error, defaultValue, registration } = props;

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <SimpleGrid columns={[2, null, 3]} spacing="5px">
          {options.map((o) => (
            <Checkbox value={o.value} {...registration} key={o.value}>
              {o.label}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
